// src/app/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data: any) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/`, data);
    const token = res.data.token; // supondo que o backend retorne { token: "..." }

    // Salva em cookie para Server Components poder ler
    document.cookie = `gc_token=${token}; path=/; max-age=${60*60*24}`; // 1 dia

    router.push("/dashboard");
  } catch {
    alert("Credenciais inválidas");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">GasControl</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
