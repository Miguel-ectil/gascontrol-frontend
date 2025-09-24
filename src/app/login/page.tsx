// src/app/login/page.tsx (client component)
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (e) {
      alert("Erro ao logar");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      <label className="block">Email<input {...register("email")} /></label>
      <label className="block">Senha<input type="password" {...register("password")} /></label>
      <button type="submit">Entrar</button>
    </form>
  );
}
