'use client'

import Footer from '@/components/Footer'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { BookOpen, Target } from 'lucide-react'

export default function OutcomesModelToolPage() {
  return (
    <>
      <div className="h-screen flex">
        {/* Fixed Sidebar */}
        <div className="w-64 h-full bg-design4-gold border-r border-design4-gold/20 p-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-design4-ink" />
            <span className="text-sm font-semibold text-design4-ink">Tool Contents</span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-design4-ink/70 uppercase tracking-wide mb-2">
                Outcomes Model Tool
              </h3>
              <div className="space-y-1">
                <a href="#tool" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Target className="h-4 w-4" />
                  <span>Interactive Tool</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Panel Area */}
        <div className="flex-1 h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex items-center justify-center bg-design4-bg">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-design4-ink mb-4">
                    Panel One
                  </h1>
                  <p className="text-design4-neutral-600">
                    Left resizable panel content
                  </p>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex items-center justify-center bg-white">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-design4-ink mb-4">
                    Panel Two
                  </h1>
                  <p className="text-design4-neutral-600">
                    Right resizable panel content
                  </p>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <Footer />
    </>
  )
}