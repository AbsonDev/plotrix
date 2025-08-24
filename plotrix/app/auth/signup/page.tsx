'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const signupSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)

    try {
      const response = await axios.post('/api/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (response.data.success) {
        toast.success('Conta criada com sucesso! Faça login para continuar.')
        router.push('/auth/login')
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    '5.000 palavras de IA grátis por mês',
    'Editor profissional com auto-save',
    'Templates de estrutura narrativa',
    'Desenvolvimento de personagens com IA',
    'Exportação em múltiplos formatos',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-12">
      <div className="w-full max-w-5xl px-4">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Plotrix
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Benefits Section */}
          <div className="hidden md:block">
            <div className="sticky top-8">
              <h2 className="text-3xl font-bold mb-4">
                Comece sua jornada literária hoje
              </h2>
              <p className="text-gray-600 mb-8">
                Junte-se a milhares de escritores que já transformaram suas ideias em realidade com Plotrix.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <p className="text-sm font-medium mb-2">🎉 Oferta Especial</p>
                <p className="text-lg font-bold mb-1">50% OFF no primeiro mês</p>
                <p className="text-sm text-gray-600">
                  Upgrade para Premium e economize R$ 24,50
                </p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Criar conta grátis</CardTitle>
              <CardDescription>
                Comece a escrever seu bestseller em minutos
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="João Silva"
                    {...register('name')}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...register('email')}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    {...register('password')}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    {...register('confirmPassword')}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
                <div className="text-xs text-gray-600">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Termos de Serviço
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  variant="gradient"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar conta grátis'
                  )}
                </Button>
                <div className="text-sm text-center text-gray-600">
                  Já tem uma conta?{' '}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Faça login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Mobile Benefits */}
        <div className="md:hidden mt-8">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
            <p className="text-sm font-medium mb-2">🎉 Oferta Especial</p>
            <p className="text-lg font-bold mb-1">50% OFF no primeiro mês</p>
            <p className="text-sm text-gray-600">
              Upgrade para Premium e economize R$ 24,50
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}