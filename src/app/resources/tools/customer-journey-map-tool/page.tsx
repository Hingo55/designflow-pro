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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookOpen, Map, User, Navigation, Smile, Lightbulb, CheckCircle, Bot, Send, Download, X, ArrowRight, Target, Users, Heart, TrendingUp, BarChart, Grid, Eye } from 'lucide-react'
import { useState, useRef } from 'react'

export default function CustomerJourneyMapToolPage() {
  const [personaText, setPersonaText] = useState('')
  const [stagesText, setStagesText] = useState('')
  const [touchpointsText, setTouchpointsText] = useState('')
  const [emotionsText, setEmotionsText] = useState('')
  const [opportunitiesText, setOpportunitiesText] = useState('')

  const [personaDone, setPersonaDone] = useState(false)
  const [stagesDone, setStagesDone] = useState(false)
  const [touchpointsDone, setTouchpointsDone] = useState(false)
  const [emotionsDone, setEmotionsDone] = useState(false)
  const [opportunitiesDone, setOpportunitiesDone] = useState(false)

  // AI Assistant state
  const [aiActive, setAiActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<any[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [finalCustomerJourneyMap, setFinalCustomerJourneyMap] = useState<any>(null)

  // Video modal state
  const [openVideoModal, setOpenVideoModal] = useState<string | null>(null)

  // PDF export ref
  const pdfContentRef = useRef<HTMLDivElement>(null)

  const getCharacterCountDisplay = (text: string, limit: number = 500) => {
    const isNearLimit = text.length > limit * 0.8
    const isOverLimit = text.length > limit
    const colorClass = isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-design4-neutral-500'
    return { count: text.length, colorClass, isOverLimit }
  }

  const allComponentsComplete = personaDone && stagesDone && touchpointsDone && emotionsDone && opportunitiesDone
  const allFieldsHaveText = personaText.trim() && stagesText.trim() && touchpointsText.trim() && emotionsText.trim() && opportunitiesText.trim()
  const readyForAI = allComponentsComplete && allFieldsHaveText

  const startAIAssistant = async () => {
    if (!readyForAI) return

    setAiActive(true)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/customer-journey-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaText,
          stagesText,
          touchpointsText,
          emotionsText,
          opportunitiesText
        })
      })

      if (response.ok) {
        const result = await response.json()
        setConversationHistory([
          { role: 'assistant', content: result.message, suggestions: result.suggestions }
        ])
      }
    } catch (error) {
      console.error('Error starting AI assistant:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (message?: string) => {
    const messageToSend = message || currentMessage
    if (!messageToSend.trim()) return

    setIsLoading(true)
    const newHistory = [...conversationHistory, { role: 'user', content: messageToSend }]
    setConversationHistory(newHistory)
    setCurrentMessage('')

    try {
      const response = await fetch('/api/ai/customer-journey-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaText,
          stagesText,
          touchpointsText,
          emotionsText,
          opportunitiesText,
          conversationHistory: newHistory,
          userMessage: messageToSend
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.type === 'final') {
          setFinalCustomerJourneyMap(result.customerJourneyMap)
          setConversationHistory([...newHistory, { role: 'assistant', content: 'Perfect! I\'ve generated your complete customer journey map based on our conversation.', type: 'final' }])
        } else {
          setConversationHistory([...newHistory, { role: 'assistant', content: result.message, suggestions: result.suggestions }])
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPDF = async () => {
    if (!finalCustomerJourneyMap) return

    try {
      // Dynamic imports for client-side only
      const jsPDF = (await import('jspdf')).default
      await import('jspdf-autotable')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const headerHeight = 15
      const footerHeight = 10
      const contentWidth = pageWidth - (margin * 2)
      let yPosition = margin + headerHeight + 10 // Start below header
      let currentPageNumber = 1

      // Add header and footer to current page
      const addHeaderFooter = () => {
        // Create Design4 logo using circles and text
        pdf.setFillColor('#f59e0b') // Design4 gold

        // Draw the 4-section circle logo
        const logoX = margin
        const logoY = margin + 4
        const radius = 3

        // Top-left quarter circle
        pdf.circle(logoX + radius, logoY, radius / 2, 'F')
        // Top-right quarter circle
        pdf.circle(logoX + radius * 2, logoY, radius / 2, 'F')
        // Bottom-left quarter circle
        pdf.circle(logoX + radius, logoY + radius, radius / 2, 'F')
        // Bottom-right quarter circle
        pdf.circle(logoX + radius * 2, logoY + radius, radius / 2, 'F')

        // Design4 text
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor('#1f2937')
        pdf.text('Design4', margin + 8, margin + 8)

        // Header title
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor('#1f2937')
        pdf.text('Customer Journey Map', margin + 30, margin + 8)

        // Header line
        pdf.setDrawColor('#e5e7eb')
        pdf.setLineWidth(0.5)
        pdf.line(margin, margin + headerHeight, pageWidth - margin, margin + headerHeight)

        // Footer
        pdf.setFontSize(8)
        pdf.setTextColor('#6b7280')
        pdf.text('design4.biz', margin, pageHeight - footerHeight)

        // Page number (right aligned)
        const pageText = `Page ${currentPageNumber}`
        const pageTextWidth = pdf.getTextWidth(pageText)
        pdf.text(pageText, pageWidth - margin - pageTextWidth, pageHeight - footerHeight)

        // Footer line
        pdf.setDrawColor('#e5e7eb')
        pdf.line(margin, pageHeight - footerHeight - 5, pageWidth - margin, pageHeight - footerHeight - 5)
      }

      // Add header/footer to first page
      addHeaderFooter()

      // Helper function to add text with automatic page breaks
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: string = '#000000') => {
        pdf.setFontSize(fontSize)
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
        pdf.setTextColor(color)

        const lines = pdf.splitTextToSize(text, contentWidth)
        const lineHeight = fontSize * 0.4

        // Check if we need a new page
        if (yPosition + (lines.length * lineHeight) > pageHeight - margin - footerHeight - 10) {
          pdf.addPage()
          currentPageNumber++
          addHeaderFooter()
          yPosition = margin + headerHeight + 10 // Reset position below header
        }

        lines.forEach((line: string) => {
          pdf.text(line, margin, yPosition)
          yPosition += lineHeight
        })

        return yPosition
      }

      const addSection = (title: string, items: any[], renderItem: (item: any) => void) => {
        if (!items || items.length === 0) return

        yPosition += 10 // Extra space before section
        addText(title, 14, true, '#1f2937')
        yPosition += 5

        items.forEach(renderItem)
        yPosition += 5 // Extra space after section
      }

      // Start with content directly (header already shows title)
      yPosition += 5

      // Purpose
      if (finalCustomerJourneyMap.purpose) {
        addText('Purpose', 16, true, '#3b82f6')
        yPosition += 5
        addText(finalCustomerJourneyMap.purpose.name, 12, true)
        yPosition += 5
        addText(finalCustomerJourneyMap.purpose.description, 10)
        if (finalCustomerJourneyMap.purpose.values && finalCustomerJourneyMap.purpose.values.length > 0) {
          yPosition += 3
          addText(`Values: ${finalCustomerJourneyMap.purpose.values.join(', ')}`, 10)
        }
        yPosition += 10
      }

      // Customer Groups
      addSection('Customer Groups', finalCustomerJourneyMap.customerGroups, (group: any) => {
        const importance = group.importance === 'H' ? 'High' : group.importance === 'M' ? 'Medium' : 'Low'
        addText(`${group.name} (${importance} Priority)`, 11, true)
        yPosition += 3
        addText(group.description, 10)
        yPosition += 8
      })

      // Customer Needs
      addSection('Customer Needs', finalCustomerJourneyMap.customerNeeds, (need: any) => {
        const criticality = need.criticality === 'H' ? 'High' : need.criticality === 'M' ? 'Medium' : 'Low'
        addText(`${need.name} (${criticality} Critical)`, 11, true)
        yPosition += 3
        addText(need.description, 10)
        yPosition += 3
        addText(`Groups: ${need.groups.join(', ')}`, 9, false, '#6b7280')
        if (need.acceptanceSignals) {
          yPosition += 2
          addText(`Success Signals: ${need.acceptanceSignals}`, 9, false, '#6b7280')
        }
        yPosition += 8
      })

      // Strategic Goals
      addSection('Strategic Goals', finalCustomerJourneyMap.strategicGoals, (goal: any) => {
        addText(goal.name, 11, true)
        yPosition += 3
        addText(goal.description, 10)
        yPosition += 3
        addText(`Metric: ${goal.metric} | Target: ${goal.target}`, 9, false, '#6b7280')
        yPosition += 2
        addText(`Timeline: ${goal.timeframe} | Owner: ${goal.owner}`, 9, false, '#6b7280')
        if (goal.contributingNeeds && goal.contributingNeeds.length > 0) {
          yPosition += 2
          addText(`Addresses Needs: ${goal.contributingNeeds.join(', ')}`, 9, false, '#6b7280')
        }
        yPosition += 8
      })

      // Outcomes
      addSection('Outcomes', finalCustomerJourneyMap.outcomes, (outcome: any) => {
        addText(outcome.name, 11, true)
        yPosition += 3
        addText(`Measure: ${outcome.measure} | Baseline: ${outcome.baseline}`, 9, false, '#6b7280')
        yPosition += 2
        addText(`Target: ${outcome.target} | Frequency: ${outcome.frequency}`, 9, false, '#6b7280')
        yPosition += 2
        addText(`Data Source: ${outcome.dataSource}`, 9, false, '#6b7280')
        yPosition += 2
        addText(`Achieves Goals: ${outcome.achievesGoals.join(', ')}`, 9, false, '#6b7280')
        yPosition += 8
      })

      // Change Impact Guidance
      if (finalCustomerJourneyMap.changeImpactGuidance) {
        yPosition += 10
        addText('Change Impact Guidance', 14, true, '#1f2937')
        yPosition += 5
        addText(finalCustomerJourneyMap.changeImpactGuidance, 10)
        yPosition += 10
      }

      // Caveat Section
      if (finalCustomerJourneyMap.caveat) {
        yPosition += 10
        addText('Important Context', 14, true, '#ea580c')
        yPosition += 5

        if (finalCustomerJourneyMap.caveat.acknowledgment) {
          addText(finalCustomerJourneyMap.caveat.acknowledgment, 10)
          yPosition += 5
        }

        if (finalCustomerJourneyMap.caveat.framingNote) {
          addText(finalCustomerJourneyMap.caveat.framingNote, 9, false, '#6b7280')
          yPosition += 8
        }

        // Uncertainties
        if (finalCustomerJourneyMap.caveat.uncertainties && finalCustomerJourneyMap.caveat.uncertainties.length > 0) {
          addText('Areas You\'re Still Working Through:', 11, true)
          yPosition += 3
          finalCustomerJourneyMap.caveat.uncertainties.forEach((uncertainty: string) => {
            addText(`• ${uncertainty}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Confidence Levels
        if (finalCustomerJourneyMap.caveat.confidenceLevels) {
          if (finalCustomerJourneyMap.caveat.confidenceLevels.confident && finalCustomerJourneyMap.caveat.confidenceLevels.confident.length > 0) {
            addText('You\'re Confident About:', 11, true)
            yPosition += 3
            finalCustomerJourneyMap.caveat.confidenceLevels.confident.forEach((item: string) => {
              addText(`• ${item}`, 9)
              yPosition += 3
            })
            yPosition += 5
          }

          if (finalCustomerJourneyMap.caveat.confidenceLevels.questioned && finalCustomerJourneyMap.caveat.confidenceLevels.questioned.length > 0) {
            addText('You\'re Uncertain About:', 11, true)
            yPosition += 3
            finalCustomerJourneyMap.caveat.confidenceLevels.questioned.forEach((item: string) => {
              addText(`• ${item}`, 9)
              yPosition += 3
            })
            yPosition += 5
          }
        }

        // Strategic Choices
        if (finalCustomerJourneyMap.caveat.strategicChoices && finalCustomerJourneyMap.caveat.strategicChoices.length > 0) {
          addText('Strategic Decisions Still To Make:', 11, true)
          yPosition += 3
          finalCustomerJourneyMap.caveat.strategicChoices.forEach((choice: string) => {
            addText(`• ${choice}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Implementation Challenges
        if (finalCustomerJourneyMap.caveat.implementationChallenges && finalCustomerJourneyMap.caveat.implementationChallenges.length > 0) {
          addText('Implementation Challenges You Identified:', 11, true)
          yPosition += 3
          finalCustomerJourneyMap.caveat.implementationChallenges.forEach((challenge: string) => {
            addText(`• ${challenge}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Testing Approaches
        if (finalCustomerJourneyMap.caveat.testingApproaches && finalCustomerJourneyMap.caveat.testingApproaches.length > 0) {
          addText('Suggested Ways to Test Different Approaches:', 11, true)
          yPosition += 3
          finalCustomerJourneyMap.caveat.testingApproaches.forEach((approach: string) => {
            addText(`• ${approach}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Next Steps
        if (finalCustomerJourneyMap.caveat.nextSteps && finalCustomerJourneyMap.caveat.nextSteps.length > 0) {
          addText('Your Next Steps:', 11, true)
          yPosition += 3
          finalCustomerJourneyMap.caveat.nextSteps.forEach((step: string) => {
            addText(`• ${step}`, 9)
            yPosition += 3
          })
        }
      }

      const today = new Date().toISOString().split('T')[0]
      pdf.save(`customer-journey-map-${today}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }
  return (
    <>
      <div className="h-screen flex">
        {/* Fixed Sidebar */}
        <div className="w-64 h-full bg-design4-orange border-r border-design4-orange/20 p-4 flex-shrink-0">
          <Link
            href="/resources/tools"
            className="flex items-center gap-2 mb-6 hover:bg-design4-ink/10 rounded p-2 -m-2 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-design4-ink" />
            <span className="text-sm font-semibold text-design4-ink">Design4 Tools</span>
          </Link>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-medium text-design4-ink/70 uppercase tracking-wide mb-2">
                Customer Journey Map Components
              </h3>
              <div className="space-y-1">
                <a href="#purpose-statement" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <User className="h-4 w-4" />
                  <span>Customer Persona</span>
                </a>
                <a href="#journey-stages" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <ArrowRight className="h-4 w-4" />
                  <span>Journey Stages</span>
                </a>
                <a href="#touchpoints" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Navigation className="h-4 w-4" />
                  <span>Touchpoints</span>
                </a>
                <a href="#emotions" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Smile className="h-4 w-4" />
                  <span>Emotions</span>
                </a>
                <a href="#opportunities" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Lightbulb className="h-4 w-4" />
                  <span>Opportunities</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Panel Area */}
        <div className="flex-1 h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <div className={`h-full bg-design4-bg p-6 overflow-y-auto ${aiActive ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="space-y-6">
                  <Card id="purpose-statement" className="bg-design4-orange scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Persona
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Define the primary customer whose journey you're mapping
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={personaText}
                          onChange={(e) => setPersonaText(e.target.value)}
                          placeholder="Describe the primary customer persona whose journey you're mapping. Include demographics, motivations, and key characteristics."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-orange focus:ring-design4-orange"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('persona')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={personaDone}
                                onCheckedChange={setPersonaDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(personaText).colorClass}`}>
                            {getCharacterCountDisplay(personaText).count}/500 characters
                            {getCharacterCountDisplay(personaText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="journey-stages" className="bg-design4-orange scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <ArrowRight className="h-5 w-5" />
                        Journey Stages
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Define the key stages of your customer's journey from awareness to advocacy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={stagesText}
                          onChange={(e) => setStagesText(e.target.value)}
                          placeholder="List the main stages of your customer journey (e.g., Awareness, Consideration, Purchase, Onboarding, Usage, Support, Renewal/Advocacy)..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-orange focus:ring-design4-orange"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('stages')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={stagesDone}
                                onCheckedChange={setStagesDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(stagesText).colorClass}`}>
                            {getCharacterCountDisplay(stagesText).count}/500 characters
                            {getCharacterCountDisplay(stagesText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="touchpoints" className="bg-design4-orange scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Navigation className="h-5 w-5" />
                        Touchpoints
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Identify all the touchpoints where customers interact with your brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={touchpointsText}
                          onChange={(e) => setTouchpointsText(e.target.value)}
                          placeholder="List all touchpoints across the journey stages (e.g., Website, Social Media, Sales Calls, Email, Product, Support, Mobile App)..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-orange focus:ring-design4-orange"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('touchpoints')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={touchpointsDone}
                                onCheckedChange={setTouchpointsDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(touchpointsText).colorClass}`}>
                            {getCharacterCountDisplay(touchpointsText).count}/500 characters
                            {getCharacterCountDisplay(touchpointsText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="emotions" className="bg-design4-orange scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Smile className="h-5 w-5" />
                        Emotions
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Map the emotional journey and feelings customers experience at each stage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={emotionsText}
                          onChange={(e) => setEmotionsText(e.target.value)}
                          placeholder="Describe the emotions customers feel at each stage (e.g., Curious → Excited → Anxious → Satisfied → Loyal). Include both positive and negative emotions..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-orange focus:ring-design4-orange"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('emotions')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={emotionsDone}
                                onCheckedChange={setEmotionsDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(emotionsText).colorClass}`}>
                            {getCharacterCountDisplay(emotionsText).count}/500 characters
                            {getCharacterCountDisplay(emotionsText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="opportunities" className="bg-design4-orange scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Opportunities
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Identify improvement opportunities and areas to enhance the customer experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={opportunitiesText}
                          onChange={(e) => setOpportunitiesText(e.target.value)}
                          placeholder="Identify opportunities for improvement at each stage (e.g., reduce friction, add value, improve communication, enhance experience)..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-orange focus:ring-design4-orange"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('opportunities')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={opportunitiesDone}
                                onCheckedChange={setOpportunitiesDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(opportunitiesText).colorClass}`}>
                            {getCharacterCountDisplay(opportunitiesText).count}/500 characters
                            {getCharacterCountDisplay(opportunitiesText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="h-full bg-white px-4">
                {finalCustomerJourneyMap ? (
                  <div className="h-full p-6 pl-6 overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-8 h-8 text-design4-orange" />
                          <h1 className="text-3xl font-bold text-design4-ink">
                            Final Customer Journey Map
                          </h1>
                        </div>
                        <Button
                          onClick={downloadPDF}
                          className="bg-design4-orange hover:bg-design4-orange/90 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                      <p className="text-design4-neutral-600 mb-6">
                        Your complete customer journey map with detailed insights and recommendations.
                      </p>
                    </div>

                    <div ref={pdfContentRef} className="space-y-6">
                      {/* Business Context */}
                      <Card className="border-design4-orange/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-orange">
                            <Target className="w-5 h-5" />
                            Business Context
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-design4-ink">Product/Service: </span>
                              <span className="text-design4-neutral-600">{finalCustomerJourneyMap.businessContext.product}</span>
                            </div>
                            <div>
                              <span className="font-medium text-design4-ink">Goals: </span>
                              <span className="text-design4-neutral-600">{finalCustomerJourneyMap.businessContext.goals}</span>
                            </div>
                            <div>
                              <span className="font-medium text-design4-ink">Customer Segments: </span>
                              <span className="text-design4-neutral-600">{finalCustomerJourneyMap.businessContext.customerSegments}</span>
                            </div>
                            <div>
                              <span className="font-medium text-design4-ink">Lifecycle: </span>
                              <span className="text-design4-neutral-600">{finalCustomerJourneyMap.businessContext.lifecycle}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Customer Persona */}
                      <Card className="border-design4-purple/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-purple">
                            <Users className="w-5 h-5" />
                            Customer Persona
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h3 className="font-semibold text-design4-ink mb-3">{finalCustomerJourneyMap.persona.name}</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-design4-ink">Goals & Motivations: </span>
                              <span className="text-sm text-design4-neutral-600">{finalCustomerJourneyMap.persona.goals}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-design4-ink">Pain Points: </span>
                              <span className="text-sm text-design4-neutral-600">{finalCustomerJourneyMap.persona.painPoints}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-design4-ink">Success Criteria: </span>
                              <span className="text-sm text-design4-neutral-600">{finalCustomerJourneyMap.persona.successCriteria}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Journey Map Table */}
                      <Card className="border-design4-orange/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-orange">
                            <BarChart className="w-5 h-5" />
                            Customer Journey Map
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="border-b border-design4-orange/20">
                                  <th className="text-left p-3 font-medium text-design4-ink">Stage</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Customer Goals</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Touchpoints</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Emotions</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Pain Points</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Owners</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">KPIs</th>
                                  <th className="text-left p-3 font-medium text-design4-ink">Opportunities</th>
                                </tr>
                              </thead>
                              <tbody>
                                {finalCustomerJourneyMap.journeyStages.map((stage: any, index: number) => (
                                  <tr key={index} className="border-b border-design4-neutral-100 hover:bg-design4-neutral-50">
                                    <td className="p-3 font-medium text-design4-ink">{stage.stageName}</td>
                                    <td className="p-3 text-design4-neutral-600">{stage.customerGoals}</td>
                                    <td className="p-3 text-design4-neutral-600">
                                      {Array.isArray(stage.touchpoints) ? stage.touchpoints.join(', ') : stage.touchpoints}
                                    </td>
                                    <td className="p-3 text-design4-neutral-600">{stage.emotions}</td>
                                    <td className="p-3 text-design4-neutral-600">{stage.painPoints}</td>
                                    <td className="p-3 text-design4-neutral-600">
                                      {Array.isArray(stage.owners) ? stage.owners.join(', ') : stage.owners}
                                    </td>
                                    <td className="p-3 text-design4-neutral-600">
                                      {Array.isArray(stage.kpis) ? stage.kpis.join(', ') : stage.kpis}
                                    </td>
                                    <td className="p-3 text-design4-neutral-600">{stage.opportunities}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Table Format Display */}
                      {finalCustomerJourneyMap.tableFormat && (
                        <Card className="border-design4-green/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-design4-green">
                              <Grid className="w-5 h-5" />
                              Table Format
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="whitespace-pre-wrap text-sm text-design4-neutral-600 font-mono">
                              {finalCustomerJourneyMap.tableFormat}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Narrative Format */}
                      {finalCustomerJourneyMap.narrativeFormat && (
                        <Card className="border-design4-blue/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-design4-blue">
                              <BookOpen className="w-5 h-5" />
                              Journey Narrative
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-design4-neutral-600 leading-relaxed">{finalCustomerJourneyMap.narrativeFormat}</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Visual Map Description */}
                      {finalCustomerJourneyMap.visualMapDescription && (
                        <Card className="border-design4-purple/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-design4-purple">
                              <Eye className="w-5 h-5" />
                              Visual Map Description
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-design4-neutral-600 leading-relaxed">{finalCustomerJourneyMap.visualMapDescription}</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Recommendations */}
                      {finalCustomerJourneyMap.recommendations && (
                        <Card className="border-design4-gold/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-design4-gold">
                              <Lightbulb className="w-5 h-5" />
                              Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {finalCustomerJourneyMap.recommendations.processOptimizations && finalCustomerJourneyMap.recommendations.processOptimizations.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Process Optimizations:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.recommendations.processOptimizations.map((item: string, index: number) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {finalCustomerJourneyMap.recommendations.teamAlignment && finalCustomerJourneyMap.recommendations.teamAlignment.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Team Alignment:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.recommendations.teamAlignment.map((item: string, index: number) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {finalCustomerJourneyMap.recommendations.technologySuggestions && finalCustomerJourneyMap.recommendations.technologySuggestions.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Technology Suggestions:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.recommendations.technologySuggestions.map((item: string, index: number) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Metrics */}
                      {finalCustomerJourneyMap.metrics && (
                        <Card className="border-design4-plum/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-design4-plum">
                              <TrendingUp className="w-5 h-5" />
                              Metrics & Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {finalCustomerJourneyMap.metrics.successMetrics && finalCustomerJourneyMap.metrics.successMetrics.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Success Metrics:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.metrics.successMetrics.map((metric: string, index: number) => (
                                      <li key={index}>{metric}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {finalCustomerJourneyMap.metrics.riskIndicators && finalCustomerJourneyMap.metrics.riskIndicators.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Risk Indicators:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.metrics.riskIndicators.map((risk: string, index: number) => (
                                      <li key={index}>{risk}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {finalCustomerJourneyMap.metrics.opportunities && finalCustomerJourneyMap.metrics.opportunities.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-design4-ink mb-2">Growth Opportunities:</h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                    {finalCustomerJourneyMap.metrics.opportunities.map((opportunity: string, index: number) => (
                                      <li key={index}>{opportunity}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Caveat Section */}
                      {finalCustomerJourneyMap.caveat && (
                        <Card className="border-design4-orange/30 bg-design4-orange/5">
                          <CardHeader>
                            <CardTitle className="text-design4-orange flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-design4-orange rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold">!</span>
                              </div>
                              Important Context
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-design4-ink mb-3">{finalCustomerJourneyMap.caveat.acknowledgment}</p>
                              <p className="text-sm text-design4-neutral-600 mb-3">{finalCustomerJourneyMap.caveat.framingNote}</p>
                            </div>

                            {finalCustomerJourneyMap.caveat.uncertainties && finalCustomerJourneyMap.caveat.uncertainties.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Areas You're Still Working Through:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalCustomerJourneyMap.caveat.uncertainties.map((uncertainty: string, index: number) => (
                                    <li key={index}>{uncertainty}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalCustomerJourneyMap.caveat.confidenceLevels && (
                              <div className="grid md:grid-cols-2 gap-4">
                                {finalCustomerJourneyMap.caveat.confidenceLevels.confident && finalCustomerJourneyMap.caveat.confidenceLevels.confident.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink mb-2 flex items-center gap-2">
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                      You're Confident About:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                      {finalCustomerJourneyMap.caveat.confidenceLevels.confident.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {finalCustomerJourneyMap.caveat.confidenceLevels.questioned && finalCustomerJourneyMap.caveat.confidenceLevels.questioned.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink mb-2 flex items-center gap-2">
                                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                      You're Uncertain About:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                      {finalCustomerJourneyMap.caveat.confidenceLevels.questioned.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {finalCustomerJourneyMap.caveat.strategicChoices && finalCustomerJourneyMap.caveat.strategicChoices.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Strategic Decisions Still To Make:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalCustomerJourneyMap.caveat.strategicChoices.map((choice: string, index: number) => (
                                    <li key={index}>{choice}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalCustomerJourneyMap.caveat.implementationChallenges && finalCustomerJourneyMap.caveat.implementationChallenges.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Implementation Challenges You Identified:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalCustomerJourneyMap.caveat.implementationChallenges.map((challenge: string, index: number) => (
                                    <li key={index}>{challenge}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalCustomerJourneyMap.caveat.testingApproaches && finalCustomerJourneyMap.caveat.testingApproaches.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Suggested Ways to Test Different Approaches:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalCustomerJourneyMap.caveat.testingApproaches.map((approach: string, index: number) => (
                                    <li key={index}>{approach}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalCustomerJourneyMap.caveat.nextSteps && finalCustomerJourneyMap.caveat.nextSteps.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Your Next Steps:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalCustomerJourneyMap.caveat.nextSteps.map((step: string, index: number) => (
                                    <li key={index}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ) : aiActive ? (
                  <div className="h-full flex flex-col">
                    {/* AI Chat Header */}
                    <div className="border-b border-design4-neutral-200 p-4">
                      <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6 text-design4-orange" />
                        <h2 className="text-xl font-semibold text-design4-ink">AI Customer Journey Map Assistant</h2>
                      </div>
                      <p className="text-sm text-design4-neutral-600 mt-1">Refining your customer journey map with AI guidance</p>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {conversationHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-3xl rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-design4-orange text-white'
                              : 'bg-design4-neutral-100 text-design4-ink'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {message.suggestions.map((suggestion: string, idx: number) => (
                                  <button
                                    key={idx}
                                    onClick={() => sendMessage(suggestion)}
                                    disabled={isLoading}
                                    className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors disabled:opacity-50"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-design4-neutral-100 rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-design4-orange"></div>
                              <span className="text-design4-neutral-600">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-design4-neutral-200 p-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                          placeholder="Type your response..."
                          className="flex-1 px-4 py-2 border border-design4-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-design4-orange focus:border-design4-orange"
                          disabled={isLoading}
                        />
                        <Button
                          onClick={() => sendMessage()}
                          disabled={isLoading || !currentMessage.trim()}
                          className="bg-design4-orange hover:bg-design4-orange/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : readyForAI ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-design4-green mx-auto mb-6" />
                      <h1 className="text-2xl font-bold text-design4-ink mb-4">
                        Ready for Design4 AI Enhancement!
                      </h1>
                      <p className="text-design4-neutral-600 mb-6 max-w-md">
                        All components are complete. Start the Design4 Customer Journey Map AI assistant to refine your customer journey map with expert guidance.
                      </p>
                      <Button
                        onClick={startAIAssistant}
                        disabled={isLoading}
                        className="bg-design4-orange hover:bg-design4-orange/90 text-white px-6 py-3 text-lg"
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
                        Customer Journey Map Progress
                      </h1>
                      <p className="text-design4-neutral-600 mb-6">
                        Complete all sections and mark them done to unlock Design4 AI assistance.
                      </p>
                      <div className="space-y-3 text-left max-w-sm">
                        <div className={`flex items-center gap-3 ${personaDone && personaText.trim() ? 'text-design4-orange' : 'text-design4-neutral-400'}`}>
                          {personaDone && personaText.trim() ? <CheckCircle className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          <span>Customer Persona</span>
                        </div>
                        <div className={`flex items-center gap-3 ${stagesDone && stagesText.trim() ? 'text-design4-orange' : 'text-design4-neutral-400'}`}>
                          {stagesDone && stagesText.trim() ? <CheckCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                          <span>Journey Stages</span>
                        </div>
                        <div className={`flex items-center gap-3 ${touchpointsDone && touchpointsText.trim() ? 'text-design4-orange' : 'text-design4-neutral-400'}`}>
                          {touchpointsDone && touchpointsText.trim() ? <CheckCircle className="w-4 h-4" /> : <Navigation className="w-4 h-4" />}
                          <span>Touchpoints</span>
                        </div>
                        <div className={`flex items-center gap-3 ${emotionsDone && emotionsText.trim() ? 'text-design4-orange' : 'text-design4-neutral-400'}`}>
                          {emotionsDone && emotionsText.trim() ? <CheckCircle className="w-4 h-4" /> : <Smile className="w-4 h-4" />}
                          <span>Emotions</span>
                        </div>
                        <div className={`flex items-center gap-3 ${opportunitiesDone && opportunitiesText.trim() ? 'text-design4-orange' : 'text-design4-neutral-400'}`}>
                          {opportunitiesDone && opportunitiesText.trim() ? <CheckCircle className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                          <span>Opportunities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <Footer />

      {/* Video Modal */}
      <Dialog open={!!openVideoModal} onOpenChange={() => setOpenVideoModal(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black border-0">
          <DialogHeader className="absolute top-4 right-4 z-50">
            <Button
              onClick={() => setOpenVideoModal(null)}
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {openVideoModal === 'persona' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer Persona Video</h3>
                  <p className="text-gray-300">Learn how to create detailed customer personas</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'stages' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Journey Stages Video</h3>
                  <p className="text-gray-300">Define the key stages of your customer journey</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'touchpoints' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Touchpoints Video</h3>
                  <p className="text-gray-300">Map all customer touchpoints across the journey</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'emotions' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Emotions Video</h3>
                  <p className="text-gray-300">Map customer emotions throughout their journey</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'opportunities' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Opportunities Video</h3>
                  <p className="text-gray-300">Identify improvement opportunities in the journey</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}