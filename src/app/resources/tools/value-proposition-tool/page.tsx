'use client'

import Footer from '@/components/Footer'
import Link from 'next/link'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Target, Building, User, Zap, Star, ArrowRight, CheckCircle, Bot, Send, X, Download } from 'lucide-react'
import { useState, useRef } from 'react'

export default function ValuePropositionToolPage() {
  const [businessContextText, setBusinessContextText] = useState('')
  const [customerPersonaText, setCustomerPersonaText] = useState('')
  const [painsCurrentStateText, setPainsCurrentStateText] = useState('')
  const [gainsDesiredStateText, setGainsDesiredStateText] = useState('')
  const [featuresValueText, setFeaturesValueText] = useState('')

  const [businessContextDone, setBusinessContextDone] = useState(false)
  const [customerPersonaDone, setCustomerPersonaDone] = useState(false)
  const [painsCurrentStateDone, setPainsCurrentStateDone] = useState(false)
  const [gainsDesiredStateDone, setGainsDesiredStateDone] = useState(false)
  const [featuresValueDone, setFeaturesValueDone] = useState(false)

  // AI Assistant state
  const [aiActive, setAiActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<any[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [finalValueProposition, setFinalValueProposition] = useState<any>(null)

  // PDF export ref
  const pdfContentRef = useRef<HTMLDivElement>(null)

  const getCharacterCountDisplay = (text: string, limit: number = 500) => {
    const isNearLimit = text.length > limit * 0.8
    const isOverLimit = text.length > limit
    const colorClass = isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-design4-neutral-500'
    return { count: text.length, colorClass, isOverLimit }
  }

  const allComponentsComplete = businessContextDone && customerPersonaDone && painsCurrentStateDone && gainsDesiredStateDone && featuresValueDone
  const allFieldsHaveText = businessContextText.trim() && customerPersonaText.trim() && painsCurrentStateText.trim() && gainsDesiredStateText.trim() && featuresValueText.trim()
  const readyForAI = allComponentsComplete && allFieldsHaveText

  const startAIAssistant = async () => {
    if (!readyForAI) return

    setAiActive(true)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/value-proposition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessContextText,
          customerPersonaText,
          painsCurrentStateText,
          gainsDesiredStateText,
          featuresValueText
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.type === 'final') {
          setFinalValueProposition(result.valueProposition)
          setConversationHistory([
            { role: 'assistant', content: 'Perfect! I\'ve generated your complete value proposition based on our conversation.', type: 'final' }
          ])
        } else {
          // Handle both structured JSON responses and plain text
          let content = result.message || result.analysis
          let suggestions = result.suggestions
          let quickActions = result.quickActions
          let prefilledInsights = result.prefilledInsights

          // If the response is a JSON string, parse it
          if (typeof content === 'string' && content.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(content)
              content = parsed.message
              suggestions = parsed.suggestions || suggestions
              quickActions = parsed.quickActions || quickActions
              prefilledInsights = parsed.prefilledInsights || prefilledInsights
            } catch (error) {
              console.log('Not a JSON response, treating as plain text')
            }
          }

          setConversationHistory([
            {
              role: 'assistant',
              content,
              suggestions,
              quickActions,
              prefilledInsights,
              type: 'clarification'
            }
          ])
        }
      }
    } catch (error) {
      console.error('Error starting AI assistant:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action: string, customMessage?: string) => {
    setIsLoading(true)

    let messageToSend = customMessage || ''

    switch (action) {
      case 'accept_continue':
        messageToSend = 'I accept your suggestions. Please continue with the analysis.'
        break
      case 'skip':
        messageToSend = 'Please skip this step and move on to the next part of the analysis.'
        break
      case 'generate_final':
        messageToSend = 'I have provided sufficient information. Please generate the final value proposition report.'
        break
      default:
        messageToSend = action // Use action as direct message
    }

    const newHistory = [...conversationHistory, { role: 'user', content: messageToSend }]
    setConversationHistory(newHistory)

    try {
      const response = await fetch('/api/ai/value-proposition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessContextText,
          customerPersonaText,
          painsCurrentStateText,
          gainsDesiredStateText,
          featuresValueText,
          conversationHistory: newHistory
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.type === 'final') {
          setFinalValueProposition(result.valueProposition)
          setConversationHistory([...newHistory, { role: 'assistant', content: 'Perfect! I\'ve generated your complete value proposition based on our conversation.', type: 'final' }])
        } else {
          // Handle both structured JSON responses and plain text
          let content = result.message || result.analysis
          let suggestions = result.suggestions
          let quickActions = result.quickActions
          let prefilledInsights = result.prefilledInsights

          // If the response is a JSON string, parse it
          if (typeof content === 'string' && content.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(content)
              content = parsed.message
              suggestions = parsed.suggestions || suggestions
              quickActions = parsed.quickActions || quickActions
              prefilledInsights = parsed.prefilledInsights || prefilledInsights
            } catch (error) {
              console.log('Not a JSON response, treating as plain text')
            }
          }

          setConversationHistory([...newHistory, {
            role: 'assistant',
            content,
            suggestions,
            quickActions,
            prefilledInsights,
            type: 'clarification'
          }])
        }
      }
    } catch (error) {
      console.error('Error with quick action:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (message?: string) => {
    const messageToSend = message || currentMessage
    if (!messageToSend.trim()) return

    setCurrentMessage('')
    setIsLoading(true)

    const newHistory = [...conversationHistory, { role: 'user', content: messageToSend }]
    setConversationHistory(newHistory)

    try {
      const response = await fetch('/api/ai/value-proposition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessContextText,
          customerPersonaText,
          painsCurrentStateText,
          gainsDesiredStateText,
          featuresValueText,
          conversationHistory: newHistory
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.type === 'final') {
          setFinalValueProposition(result.valueProposition)
          setConversationHistory([...newHistory, { role: 'assistant', content: 'Perfect! I\'ve generated your complete value proposition based on our conversation.', type: 'final' }])
        } else {
          // Handle both structured JSON responses and plain text
          let content = result.message || result.analysis
          let suggestions = result.suggestions
          let quickActions = result.quickActions
          let prefilledInsights = result.prefilledInsights

          // If the response is a JSON string, parse it
          if (typeof content === 'string' && content.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(content)
              content = parsed.message
              suggestions = parsed.suggestions || suggestions
              quickActions = parsed.quickActions || quickActions
              prefilledInsights = parsed.prefilledInsights || prefilledInsights
            } catch (error) {
              console.log('Not a JSON response, treating as plain text')
            }
          }

          setConversationHistory([...newHistory, {
            role: 'assistant',
            content,
            suggestions,
            quickActions,
            prefilledInsights,
            type: 'clarification'
          }])
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to format JSON responses from AI
  const formatAIResponse = (content: string) => {
    try {
      const parsed = JSON.parse(content)
      return (
        <div className="space-y-4">
          <div className="bg-design4-purple/10 rounded-lg p-4">
            <h3 className="font-semibold text-design4-purple mb-2">Stage: {parsed.stage}</h3>

            {parsed.questions && parsed.questions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-design4-ink mb-2">Strategic Questions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {parsed.questions.map((question: string, index: number) => (
                    <li key={index} className="text-design4-neutral-600">{question}</li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.insights && parsed.insights.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-design4-ink mb-2">Business Insights:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {parsed.insights.map((insight: string, index: number) => (
                    <li key={index} className="text-design4-neutral-600">{insight}</li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.validation && (
              <div className="mb-4">
                <h4 className="font-medium text-design4-ink mb-2">Validation Required:</h4>
                <p className="text-design4-neutral-600">{parsed.validation}</p>
              </div>
            )}

            {parsed.next_stage && (
              <div className="mb-4">
                <h4 className="font-medium text-design4-ink mb-2">Next Stage:</h4>
                <p className="text-design4-neutral-600">{parsed.next_stage}</p>
              </div>
            )}

            {parsed.caveats && parsed.caveats.length > 0 && (
              <div>
                <h4 className="font-medium text-design4-ink mb-2">Considerations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {parsed.caveats.map((caveat: string, index: number) => (
                    <li key={index} className="text-design4-neutral-600 text-sm">{caveat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )
    } catch (error) {
      // If not valid JSON, return as plain text
      return <div className="text-sm whitespace-pre-wrap">{content}</div>
    }
  }

  // PDF Export function
  const exportToPDF = async () => {
    if (!finalValueProposition) {
      alert('Please complete the AI analysis first to generate a report.')
      return
    }

    try {
      const { jsPDF } = await import('jspdf')

      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 40
      const contentWidth = pageWidth - (margin * 2)
      const headerHeight = 60
      const footerHeight = 30

      let yPosition = margin + headerHeight
      let currentPageNumber = 1

      // Helper function to add header and footer
      const addHeaderFooter = () => {
        // Header
        pdf.setFillColor('#9333EA') // design4-purple
        pdf.rect(0, 0, pageWidth, headerHeight)

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(18)
        pdf.setTextColor('#FFFFFF')
        pdf.text('Value Proposition Report', margin, 35)

        // Footer
        pdf.setFontSize(10)
        pdf.setTextColor('#6b7280')
        pdf.text('Generated by Design4.biz', margin, pageHeight - footerHeight + 15)

        const pageText = `Page ${currentPageNumber}`
        const pageTextWidth = pdf.getTextWidth(pageText)
        pdf.text(pageText, pageWidth - margin - pageTextWidth, pageHeight - footerHeight + 15)

        // Footer line
        pdf.setDrawColor('#e5e7eb')
        pdf.line(margin, pageHeight - footerHeight - 5, pageWidth - margin, pageHeight - footerHeight - 5)
      }

      // Add header/footer to first page
      addHeaderFooter()

      // Helper function to add text with automatic page breaks
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: string = '#000000') => {
        if (!text || text.trim() === '') return

        pdf.setFontSize(fontSize)
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
        pdf.setTextColor(color)

        const lines = pdf.splitTextToSize(text, contentWidth)
        const lineHeight = fontSize * 1.2

        // Check if we need a new page
        if (yPosition + (lines.length * lineHeight) > pageHeight - margin - footerHeight - 10) {
          pdf.addPage()
          currentPageNumber++
          addHeaderFooter()
          yPosition = margin + headerHeight + 10
        }

        lines.forEach((line: string) => {
          pdf.text(line, margin, yPosition)
          yPosition += lineHeight
        })
      }

      // Content sections
      yPosition += 10

      // Business Context
      if (finalValueProposition.businessContext) {
        addText('Business Context', 16, true, '#9333EA')
        yPosition += 10
        addText(`Industry: ${finalValueProposition.businessContext.industry}`, 12, true)
        yPosition += 5
        addText(finalValueProposition.businessContext.marketDynamics, 10)
        yPosition += 8
        addText('Competitive Landscape:', 12, true)
        yPosition += 5
        addText(finalValueProposition.businessContext.competitiveLandscape, 10)
        yPosition += 8
        addText('Strategic Constraints:', 12, true)
        yPosition += 5
        addText(finalValueProposition.businessContext.strategicConstraints, 10)
        yPosition += 15
      }

      // Customer Profile
      if (finalValueProposition.customerProfile) {
        addText('Customer Profile', 16, true, '#9333EA')
        yPosition += 10

        if (finalValueProposition.customerProfile.persona) {
          addText(finalValueProposition.customerProfile.persona.name, 12, true)
          yPosition += 5
          addText(finalValueProposition.customerProfile.persona.description, 10)
          if (finalValueProposition.customerProfile.persona.demographics) {
            yPosition += 5
            addText(`Demographics: ${finalValueProposition.customerProfile.persona.demographics}`, 10)
          }
          yPosition += 10
        }

        if (finalValueProposition.customerProfile.jobsToBeDone) {
          addText('Jobs to Be Done:', 12, true)
          yPosition += 5
          if (finalValueProposition.customerProfile.jobsToBeDone.functional?.length > 0) {
            addText('Functional Jobs:', 11, true)
            yPosition += 3
            finalValueProposition.customerProfile.jobsToBeDone.functional.forEach((job: string) => {
              addText(`• ${job}`, 10)
              yPosition += 3
            })
            yPosition += 5
          }
          if (finalValueProposition.customerProfile.jobsToBeDone.emotional?.length > 0) {
            addText('Emotional Jobs:', 11, true)
            yPosition += 3
            finalValueProposition.customerProfile.jobsToBeDone.emotional.forEach((job: string) => {
              addText(`• ${job}`, 10)
              yPosition += 3
            })
            yPosition += 5
          }
          if (finalValueProposition.customerProfile.jobsToBeDone.social?.length > 0) {
            addText('Social Jobs:', 11, true)
            yPosition += 3
            finalValueProposition.customerProfile.jobsToBeDone.social.forEach((job: string) => {
              addText(`• ${job}`, 10)
              yPosition += 3
            })
          }
          yPosition += 10
        }

        if (finalValueProposition.customerProfile.painPoints?.length > 0) {
          addText('Pain Points:', 12, true)
          yPosition += 5
          finalValueProposition.customerProfile.painPoints.forEach((pain: any) => {
            const severity = pain.severity === 'H' ? 'High' : pain.severity === 'M' ? 'Medium' : 'Low'
            addText(`• [${severity}] ${pain.pain}`, 10)
            yPosition += 3
            if (pain.frequency) {
              addText(`  Frequency: ${pain.frequency}`, 9)
              yPosition += 3
            }
          })
          yPosition += 10
        }
      }

      // Value Map
      if (finalValueProposition.valueMap) {
        addText('Value Map', 16, true, '#9333EA')
        yPosition += 10

        if (finalValueProposition.valueMap.painRelievers?.length > 0) {
          addText('Pain Relievers:', 12, true)
          yPosition += 5
          finalValueProposition.valueMap.painRelievers.forEach((reliever: any) => {
            addText(`• ${reliever.reliever}`, 10)
            yPosition += 3
            if (reliever.addressesPains?.length > 0) {
              addText(`  Addresses: ${reliever.addressesPains.join(', ')}`, 9)
              yPosition += 3
            }
          })
          yPosition += 10
        }

        if (finalValueProposition.valueMap.gainCreators?.length > 0) {
          addText('Gain Creators:', 12, true)
          yPosition += 5
          finalValueProposition.valueMap.gainCreators.forEach((creator: any) => {
            addText(`• ${creator.creator}`, 10)
            yPosition += 3
            if (creator.createsGains?.length > 0) {
              addText(`  Creates: ${creator.createsGains.join(', ')}`, 9)
              yPosition += 3
            }
          })
          yPosition += 10
        }

        if (finalValueProposition.valueMap.products?.length > 0) {
          addText('Products & Services:', 12, true)
          yPosition += 5
          finalValueProposition.valueMap.products.forEach((product: string) => {
            addText(`• ${product}`, 10)
            yPosition += 3
          })
          yPosition += 15
        }
      }

      // Fit Assessment
      if (finalValueProposition.fitAssessment) {
        addText('Fit Assessment', 16, true, '#9333EA')
        yPosition += 10
        addText('Pain-Solution Fit:', 12, true)
        yPosition += 5
        addText(finalValueProposition.fitAssessment.painFit, 10)
        yPosition += 8
        addText('Gain-Solution Fit:', 12, true)
        yPosition += 5
        addText(finalValueProposition.fitAssessment.gainFit, 10)
        yPosition += 8
        addText('Product-Market Fit:', 12, true)
        yPosition += 5
        addText(finalValueProposition.fitAssessment.productMarketFit, 10)
        yPosition += 8
        addText('Differentiation:', 12, true)
        yPosition += 5
        addText(finalValueProposition.fitAssessment.differentiation, 10)
        yPosition += 15
      }

      // Implementation
      if (finalValueProposition.implementation) {
        addText('Implementation Roadmap', 16, true, '#9333EA')
        yPosition += 10

        if (finalValueProposition.implementation.successMetrics?.length > 0) {
          addText('Success Metrics:', 12, true)
          yPosition += 5
          finalValueProposition.implementation.successMetrics.forEach((metric: string) => {
            addText(`• ${metric}`, 10)
            yPosition += 3
          })
          yPosition += 10
        }

        if (finalValueProposition.implementation.testingApproaches?.length > 0) {
          addText('Testing Approaches:', 12, true)
          yPosition += 5
          finalValueProposition.implementation.testingApproaches.forEach((approach: string) => {
            addText(`• ${approach}`, 10)
            yPosition += 3
          })
          yPosition += 10
        }

        if (finalValueProposition.implementation.implementationRoadmap?.length > 0) {
          addText('Implementation Steps:', 12, true)
          yPosition += 5
          finalValueProposition.implementation.implementationRoadmap.forEach((step: string) => {
            addText(`• ${step}`, 10)
            yPosition += 3
          })
          yPosition += 15
        }
      }

      // Caveat
      if (finalValueProposition.caveat) {
        addText('Implementation Considerations', 16, true, '#f59e0b')
        yPosition += 10
        addText(finalValueProposition.caveat.acknowledgment, 10)
        yPosition += 8

        if (finalValueProposition.caveat.uncertainties?.length > 0) {
          addText('Areas for Further Validation:', 12, true)
          yPosition += 5
          finalValueProposition.caveat.uncertainties.forEach((uncertainty: string) => {
            addText(`• ${uncertainty}`, 10)
            yPosition += 3
          })
          yPosition += 10
        }

        if (finalValueProposition.caveat.nextSteps?.length > 0) {
          addText('Recommended Next Steps:', 12, true)
          yPosition += 5
          finalValueProposition.caveat.nextSteps.forEach((step: string) => {
            addText(`• ${step}`, 10)
            yPosition += 3
          })
          yPosition += 10
        }

        if (finalValueProposition.caveat.framingNote) {
          addText(finalValueProposition.caveat.framingNote, 10, true)
        }
      }

      // Save the PDF
      const timestamp = new Date().toISOString().slice(0, 10)
      pdf.save(`value-proposition-report-${timestamp}.pdf`)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <>
      <div className="h-screen flex">
        {/* Fixed Sidebar */}
        <div className="w-64 h-full bg-design4-purple border-r border-design4-purple/20 p-4 flex-shrink-0">
          <Link
            href="/resources/tools"
            className="flex items-center gap-2 mb-6 hover:bg-white/10 rounded p-2 -m-2 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">Design4 Tools</span>
          </Link>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-white/70 uppercase tracking-wide mb-2">
                Value Proposition Components
              </h3>
              <div className="space-y-1">
                <a href="#business-context" className="flex items-center gap-2 px-2 py-1 text-sm text-white hover:bg-white/10 rounded">
                  <Building className="h-4 w-4" />
                  <span>Business Context</span>
                </a>
                <a href="#customer-persona" className="flex items-center gap-2 px-2 py-1 text-sm text-white hover:bg-white/10 rounded">
                  <User className="h-4 w-4" />
                  <span>Customer Persona & Jobs</span>
                </a>
                <a href="#customer-pains" className="flex items-center gap-2 px-2 py-1 text-sm text-white hover:bg-white/10 rounded">
                  <Zap className="h-4 w-4" />
                  <span>Customer Pains</span>
                </a>
                <a href="#customer-gains" className="flex items-center gap-2 px-2 py-1 text-sm text-white hover:bg-white/10 rounded">
                  <Star className="h-4 w-4" />
                  <span>Customer Gains</span>
                </a>
                <a href="#features-value" className="flex items-center gap-2 px-2 py-1 text-sm text-white hover:bg-white/10 rounded">
                  <ArrowRight className="h-4 w-4" />
                  <span>Features & Value</span>
                </a>
              </div>
            </div>
            {readyForAI && !aiActive && (
              <div className="pt-4 border-t border-white/20">
                <Button
                  onClick={startAIAssistant}
                  className="w-full bg-white text-design4-purple hover:bg-white/90"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Start AI Assistant
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full">
          <div className="h-full bg-design4-bg">
            <ResizablePanelGroup direction="horizontal">
              {/* Left side: Cards */}
              <ResizablePanel defaultSize={70}>
                <div className={`h-full p-6 overflow-y-auto ${aiActive ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="space-y-6">
                    <Card id="business-context" className="bg-design4-purple scroll-mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Business Context
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Describe your product, business, target audience, and how your business works
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Textarea
                            value={businessContextText}
                            onChange={(e) => setBusinessContextText(e.target.value)}
                            placeholder="What is your product/service? What business are you in? Who is your target audience? How does your business model work? Include any key details about your offering..."
                            className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-purple focus:ring-design4-purple"
                            disabled={aiActive}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50">
                                Show me an example
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={businessContextDone}
                                  onCheckedChange={setBusinessContextDone}
                                  className="data-[state=checked]:bg-design4-purple"
                                  disabled={aiActive}
                                />
                                <span className="text-sm text-white">Done</span>
                              </div>
                            </div>
                            <div className={`text-xs ${getCharacterCountDisplay(businessContextText).colorClass}`}>
                              {getCharacterCountDisplay(businessContextText).count}/500 characters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="customer-persona" className="bg-design4-purple scroll-mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Customer Persona & Jobs
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Define your ideal customer and the functional, emotional, and social jobs they're trying to accomplish
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Textarea
                            value={customerPersonaText}
                            onChange={(e) => setCustomerPersonaText(e.target.value)}
                            placeholder="Who is your ideal customer? (demographics, role, context) What functional jobs are they trying to get done? What emotional outcomes do they want? How do they want to be perceived socially?"
                            className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-purple focus:ring-design4-purple"
                            disabled={aiActive}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50">
                                Show me an example
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={customerPersonaDone}
                                  onCheckedChange={setCustomerPersonaDone}
                                  className="data-[state=checked]:bg-design4-purple"
                                  disabled={aiActive}
                                />
                                <span className="text-sm text-white">Done</span>
                              </div>
                            </div>
                            <div className={`text-xs ${getCharacterCountDisplay(customerPersonaText).colorClass}`}>
                              {getCharacterCountDisplay(customerPersonaText).count}/500 characters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="customer-pains" className="bg-design4-purple scroll-mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Customer Pains & Current State
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Identify frustrations, obstacles, risks, and negative experiences customers face
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Textarea
                            value={painsCurrentStateText}
                            onChange={(e) => setPainsCurrentStateText(e.target.value)}
                            placeholder="What frustrates your customers? What obstacles prevent them from completing their jobs? What risks do they worry about? What negative experiences do they have with current solutions?"
                            className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-purple focus:ring-design4-purple"
                            disabled={aiActive}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50">
                                Show me an example
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={painsCurrentStateDone}
                                  onCheckedChange={setPainsCurrentStateDone}
                                  className="data-[state=checked]:bg-design4-purple"
                                  disabled={aiActive}
                                />
                                <span className="text-sm text-white">Done</span>
                              </div>
                            </div>
                            <div className={`text-xs ${getCharacterCountDisplay(painsCurrentStateText).colorClass}`}>
                              {getCharacterCountDisplay(painsCurrentStateText).count}/500 characters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="customer-gains" className="bg-design4-purple scroll-mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Star className="h-5 w-5" />
                          Customer Gains & Desired State
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Define positive outcomes, benefits, and aspirational results customers want to achieve
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Textarea
                            value={gainsDesiredStateText}
                            onChange={(e) => setGainsDesiredStateText(e.target.value)}
                            placeholder="What positive outcomes do customers want? What would delight them? What success metrics matter to them? What would make their experience great?"
                            className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-purple focus:ring-design4-purple"
                            disabled={aiActive}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50">
                                Show me an example
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={gainsDesiredStateDone}
                                  onCheckedChange={setGainsDesiredStateDone}
                                  className="data-[state=checked]:bg-design4-purple"
                                  disabled={aiActive}
                                />
                                <span className="text-sm text-white">Done</span>
                              </div>
                            </div>
                            <div className={`text-xs ${getCharacterCountDisplay(gainsDesiredStateText).colorClass}`}>
                              {getCharacterCountDisplay(gainsDesiredStateText).count}/500 characters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="features-value" className="bg-design4-purple scroll-mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <ArrowRight className="h-5 w-5" />
                          Features & Value Proposition
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Describe your product features, unique selling points, and how you address customer needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Textarea
                            value={featuresValueText}
                            onChange={(e) => setFeaturesValueText(e.target.value)}
                            placeholder="What features does your product have? What makes you unique from competitors? How do you solve customer pains? What value do you create?"
                            className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-purple focus:ring-design4-purple"
                            disabled={aiActive}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50">
                                Show me an example
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={featuresValueDone}
                                  onCheckedChange={setFeaturesValueDone}
                                  className="data-[state=checked]:bg-design4-purple"
                                  disabled={aiActive}
                                />
                                <span className="text-sm text-white">Done</span>
                              </div>
                            </div>
                            <div className={`text-xs ${getCharacterCountDisplay(featuresValueText).colorClass}`}>
                              {getCharacterCountDisplay(featuresValueText).count}/500 characters
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ResizablePanel>

              {/* Right side: Progress tracking / AI Assistant */}
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30}>
                <div className="h-full bg-white border-l border-design4-neutral-200 overflow-y-auto">
                  {aiActive ? (
                    <div className="flex flex-col h-full">
                      <div className="p-4 border-b border-design4-neutral-200 bg-design4-purple text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <span className="font-medium">AI Value Proposition Assistant</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={exportToPDF}
                              className="text-white hover:bg-white/20"
                              title="Export to PDF"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setAiActive(false)}
                              className="text-white hover:bg-white/20"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-white/90 text-sm mt-2">Refining your value proposition with AI guidance</p>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Final Value Proposition Report */}
                        {finalValueProposition && (
                          <div className="bg-white rounded-lg p-6 space-y-6">
                            <div className="text-center border-b border-design4-neutral-200 pb-4">
                              <h2 className="text-2xl font-bold text-design4-ink">Value Proposition Report</h2>
                              <p className="text-design4-neutral-600 mt-2">Your strategic value proposition framework</p>
                            </div>

                            {/* Business Context */}
                            {finalValueProposition.businessContext && (
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-design4-purple">Business Context</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Industry</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.businessContext.industry}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Market Dynamics</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.businessContext.marketDynamics}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Competitive Landscape</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.businessContext.competitiveLandscape}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Strategic Constraints</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.businessContext.strategicConstraints}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Customer Profile */}
                            {finalValueProposition.customerProfile && (
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-design4-purple">Customer Profile</h3>

                                {finalValueProposition.customerProfile.persona && (
                                  <div className="bg-design4-neutral-50 rounded-lg p-4">
                                    <h4 className="font-medium text-design4-ink">{finalValueProposition.customerProfile.persona.name}</h4>
                                    <p className="text-sm text-design4-neutral-600 mt-1">{finalValueProposition.customerProfile.persona.description}</p>
                                    {finalValueProposition.customerProfile.persona.demographics && (
                                      <p className="text-sm text-design4-neutral-600 mt-2"><strong>Demographics:</strong> {finalValueProposition.customerProfile.persona.demographics}</p>
                                    )}
                                  </div>
                                )}

                                {finalValueProposition.customerProfile.jobsToBeDone && (
                                  <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Functional Jobs</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.customerProfile.jobsToBeDone.functional?.map((job: string, i: number) => (
                                          <li key={i}>{job}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Emotional Jobs</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.customerProfile.jobsToBeDone.emotional?.map((job: string, i: number) => (
                                          <li key={i}>{job}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Social Jobs</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.customerProfile.jobsToBeDone.social?.map((job: string, i: number) => (
                                          <li key={i}>{job}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}

                                {finalValueProposition.customerProfile.painPoints && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Pain Points</h4>
                                    <div className="mt-2 space-y-2">
                                      {finalValueProposition.customerProfile.painPoints.map((pain: any, i: number) => (
                                        <div key={i} className="bg-red-50 border border-red-200 rounded p-3">
                                          <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                              pain.severity === 'H' ? 'bg-red-100 text-red-800' :
                                              pain.severity === 'M' ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-green-100 text-green-800'
                                            }`}>
                                              {pain.severity === 'H' ? 'High' : pain.severity === 'M' ? 'Medium' : 'Low'}
                                            </span>
                                            <span className="text-sm text-red-800 font-medium">{pain.pain}</span>
                                          </div>
                                          {pain.frequency && (
                                            <p className="text-xs text-red-600 mt-1">Frequency: {pain.frequency}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {finalValueProposition.customerProfile.gains && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Customer Gains</h4>
                                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                                      {finalValueProposition.customerProfile.gains.required && (
                                        <div>
                                          <h5 className="text-sm font-medium text-red-600">Required Gains</h5>
                                          <ul className="text-sm text-design4-neutral-600 list-disc pl-4">
                                            {finalValueProposition.customerProfile.gains.required.map((gain: string, i: number) => (
                                              <li key={i}>{gain}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {finalValueProposition.customerProfile.gains.expected && (
                                        <div>
                                          <h5 className="text-sm font-medium text-yellow-600">Expected Gains</h5>
                                          <ul className="text-sm text-design4-neutral-600 list-disc pl-4">
                                            {finalValueProposition.customerProfile.gains.expected.map((gain: string, i: number) => (
                                              <li key={i}>{gain}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {finalValueProposition.customerProfile.gains.desired && (
                                        <div>
                                          <h5 className="text-sm font-medium text-blue-600">Desired Gains</h5>
                                          <ul className="text-sm text-design4-neutral-600 list-disc pl-4">
                                            {finalValueProposition.customerProfile.gains.desired.map((gain: string, i: number) => (
                                              <li key={i}>{gain}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {finalValueProposition.customerProfile.gains.unexpected && (
                                        <div>
                                          <h5 className="text-sm font-medium text-green-600">Unexpected Gains</h5>
                                          <ul className="text-sm text-design4-neutral-600 list-disc pl-4">
                                            {finalValueProposition.customerProfile.gains.unexpected.map((gain: string, i: number) => (
                                              <li key={i}>{gain}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Value Map */}
                            {finalValueProposition.valueMap && (
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-design4-purple">Value Map</h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                  {finalValueProposition.valueMap.painRelievers && (
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Pain Relievers</h4>
                                      <div className="space-y-2 mt-2">
                                        {finalValueProposition.valueMap.painRelievers.map((reliever: any, i: number) => (
                                          <div key={i} className="bg-green-50 border border-green-200 rounded p-3">
                                            <p className="text-sm font-medium text-green-800">{reliever.reliever}</p>
                                            {reliever.addressesPains && (
                                              <p className="text-xs text-green-600 mt-1">Addresses: {reliever.addressesPains.join(', ')}</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {finalValueProposition.valueMap.gainCreators && (
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Gain Creators</h4>
                                      <div className="space-y-2 mt-2">
                                        {finalValueProposition.valueMap.gainCreators.map((creator: any, i: number) => (
                                          <div key={i} className="bg-blue-50 border border-blue-200 rounded p-3">
                                            <p className="text-sm font-medium text-blue-800">{creator.creator}</p>
                                            {creator.createsGains && (
                                              <p className="text-xs text-blue-600 mt-1">Creates: {creator.createsGains.join(', ')}</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {finalValueProposition.valueMap.products && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Products & Services</h4>
                                    <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                      {finalValueProposition.valueMap.products.map((product: string, i: number) => (
                                        <li key={i}>{product}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Fit Assessment */}
                            {finalValueProposition.fitAssessment && (
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-design4-purple">Fit Assessment</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Pain-Solution Fit</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.fitAssessment.painFit}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Gain-Solution Fit</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.fitAssessment.gainFit}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Product-Market Fit</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.fitAssessment.productMarketFit}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Differentiation</h4>
                                    <p className="text-sm text-design4-neutral-600">{finalValueProposition.fitAssessment.differentiation}</p>
                                  </div>
                                </div>
                                {finalValueProposition.fitAssessment.switchingTriggers && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink">Switching Triggers</h4>
                                    <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                      {finalValueProposition.fitAssessment.switchingTriggers.map((trigger: string, i: number) => (
                                        <li key={i}>{trigger}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Implementation */}
                            {finalValueProposition.implementation && (
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-design4-purple">Implementation Roadmap</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                  {finalValueProposition.implementation.successMetrics && (
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Success Metrics</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.implementation.successMetrics.map((metric: string, i: number) => (
                                          <li key={i}>{metric}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {finalValueProposition.implementation.testingApproaches && (
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Testing Approaches</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.implementation.testingApproaches.map((approach: string, i: number) => (
                                          <li key={i}>{approach}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {finalValueProposition.implementation.implementationRoadmap && (
                                    <div>
                                      <h4 className="font-medium text-design4-ink">Implementation Steps</h4>
                                      <ul className="text-sm text-design4-neutral-600 list-disc pl-4 mt-1">
                                        {finalValueProposition.implementation.implementationRoadmap.map((step: string, i: number) => (
                                          <li key={i}>{step}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Caveat */}
                            {finalValueProposition.caveat && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Implementation Considerations</h3>
                                <p className="text-sm text-yellow-700 mb-3">{finalValueProposition.caveat.acknowledgment}</p>

                                {finalValueProposition.caveat.uncertainties && finalValueProposition.caveat.uncertainties.length > 0 && (
                                  <div className="mb-3">
                                    <h4 className="font-medium text-yellow-800">Areas for Further Validation</h4>
                                    <ul className="text-sm text-yellow-700 list-disc pl-4 mt-1">
                                      {finalValueProposition.caveat.uncertainties.map((uncertainty: string, i: number) => (
                                        <li key={i}>{uncertainty}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {finalValueProposition.caveat.nextSteps && finalValueProposition.caveat.nextSteps.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-yellow-800">Recommended Next Steps</h4>
                                    <ul className="text-sm text-yellow-700 list-disc pl-4 mt-1">
                                      {finalValueProposition.caveat.nextSteps.map((step: string, i: number) => (
                                        <li key={i}>{step}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <p className="text-sm text-yellow-700 mt-3 italic">{finalValueProposition.caveat.framingNote}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {conversationHistory.map((message, index) => (
                          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === 'user'
                                ? 'bg-design4-purple text-white'
                                : 'bg-design4-neutral-100 text-design4-ink'
                            }`}>
                              <div className="text-sm whitespace-pre-wrap">
                                {message.content}
                              </div>

                              {/* Quick Response Suggestions */}
                              {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  <div className="text-xs font-medium text-design4-neutral-600">Quick responses:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {message.suggestions.map((suggestion: string, i: number) => (
                                      <button
                                        key={i}
                                        onClick={() => sendMessage(suggestion)}
                                        className="px-3 py-1 bg-design4-purple/10 text-design4-purple text-xs rounded-full hover:bg-design4-purple/20 transition-colors"
                                      >
                                        {suggestion}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Quick Action Buttons */}
                              {message.role === 'assistant' && message.quickActions && message.quickActions.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  <div className="text-xs font-medium text-design4-neutral-600">Quick actions:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {message.quickActions.map((action: any, i: number) => (
                                      <button
                                        key={i}
                                        onClick={() => handleQuickAction(action.action)}
                                        className="px-4 py-2 bg-design4-purple text-white text-xs rounded-lg hover:bg-design4-purple/90 transition-colors font-medium"
                                      >
                                        {action.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Prefilled Insights Preview */}
                              {message.role === 'assistant' && message.prefilledInsights && (
                                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="text-xs font-medium text-green-800 mb-2">Auto-generated insights:</div>
                                  <div className="text-xs text-green-700 space-y-1">
                                    {Object.entries(message.prefilledInsights).map(([key, value]) => (
                                      <div key={key}>
                                        <span className="font-medium">{key}:</span> {value as string}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-design4-neutral-100 rounded-2xl px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-design4-purple"></div>
                                <span className="text-design4-neutral-600">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-t border-design4-neutral-200">
                        <div className="flex gap-2">
                          <Textarea
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Ask questions or request refinements..."
                            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                sendMessage()
                              }
                            }}
                          />
                          <Button
                            onClick={() => sendMessage()}
                            disabled={!currentMessage.trim() || isLoading}
                            className="bg-design4-purple hover:bg-design4-purple/90"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : readyForAI ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-design4-purple mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-design4-ink mb-4">
                          Ready for Design4 AI Enhancement!
                        </h1>
                        <p className="text-design4-neutral-600 mb-6 max-w-md">
                          All components are complete. Start the Design4 Value Proposition AI assistant to create your comprehensive value proposition canvas.
                        </p>
                        <Button
                          onClick={startAIAssistant}
                          disabled={isLoading}
                          className="bg-design4-purple hover:bg-design4-purple/90 text-white px-6 py-3 text-lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Starting AI Assistant...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Bot className="w-5 h-5" />
                              Start Design4 AI Assistant
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center px-4">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-design4-ink mb-4">
                          Value Proposition Progress
                        </h1>
                        <p className="text-design4-neutral-600 mb-6">Complete all sections and mark them done to unlock Design4 AI assistance.</p>
                        <div className="space-y-4">
                          {[
                            { label: 'Business Context', done: businessContextDone && businessContextText.trim(), icon: Building },
                            { label: 'Customer Persona & Jobs', done: customerPersonaDone && customerPersonaText.trim(), icon: User },
                            { label: 'Customer Pains', done: painsCurrentStateDone && painsCurrentStateText.trim(), icon: Zap },
                            { label: 'Customer Gains', done: gainsDesiredStateDone && gainsDesiredStateText.trim(), icon: Star },
                            { label: 'Features & Value', done: featuresValueDone && featuresValueText.trim(), icon: ArrowRight }
                          ].map((item, index) => {
                            const IconComponent = item.icon
                            return (
                              <div key={index} className="flex items-center gap-2">
                                {item.done ? (
                                  <CheckCircle className="w-4 h-4 text-design4-purple" />
                                ) : (
                                  <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />
                                )}
                                <IconComponent className="w-4 h-4 text-design4-neutral-400" />
                                <span className={`text-sm ${item.done ? 'text-design4-purple font-medium' : 'text-design4-neutral-400'}`}>
                                  {item.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}