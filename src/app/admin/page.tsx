'use client'

import Footer from '@/components/Footer'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Image, Settings, Users, BarChart, FileText } from 'lucide-react'

export default function AdminDashboard() {
  const adminTools = [
    {
      title: 'Blog Management',
      description: 'Upload images, manage blog posts, and edit content',
      href: '/admin/blog',
      icon: BookOpen,
      color: 'bg-design4-teal',
      hoverColor: 'hover:bg-design4-teal/90'
    },
    {
      title: 'Media Gallery',
      description: 'Manage images, videos, and other media assets',
      href: '/admin/media',
      icon: Image,
      color: 'bg-design4-purple',
      hoverColor: 'hover:bg-design4-purple/90'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      href: '/admin/users',
      icon: Users,
      color: 'bg-design4-green',
      hoverColor: 'hover:bg-design4-green/90'
    },
    {
      title: 'Analytics',
      description: 'View site analytics and performance metrics',
      href: '/admin/analytics',
      icon: BarChart,
      color: 'bg-design4-gold',
      hoverColor: 'hover:bg-design4-gold/90'
    },
    {
      title: 'Content Management',
      description: 'Edit pages, resources, and site content',
      href: '/admin/content',
      icon: FileText,
      color: 'bg-design4-orange',
      hoverColor: 'hover:bg-design4-orange/90'
    },
    {
      title: 'Site Settings',
      description: 'Configure site settings and preferences',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-design4-plum',
      hoverColor: 'hover:bg-design4-plum/90'
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-design4-bg pt-24">
        <div className="mx-auto max-w-design4-container px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-design4-ink mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-design4-neutral-600">
              Manage your Design4 platform content and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-design4-neutral-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${tool.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl text-design4-ink">
                          {tool.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-design4-neutral-600">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        className={`w-full ${tool.color} ${tool.hoverColor} text-white font-medium`}
                        asChild
                      >
                        <span>
                          Open {tool.title}
                        </span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mt-16 bg-white rounded-lg border border-design4-neutral-200 p-8">
            <h2 className="text-2xl font-bold text-design4-ink mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                asChild
                variant="outline"
                className="border-design4-teal text-design4-teal hover:bg-design4-teal hover:text-white"
              >
                <Link href="/admin/blog">
                  Upload Blog Image
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-design4-purple text-design4-purple hover:bg-design4-purple hover:text-white"
              >
                <Link href="/blog">
                  View Blog
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-design4-green text-design4-green hover:bg-design4-green hover:text-white"
              >
                <Link href="/resources">
                  Manage Resources
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-design4-gold text-design4-gold hover:bg-design4-gold hover:text-white"
              >
                <Link href="/">
                  View Site
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}