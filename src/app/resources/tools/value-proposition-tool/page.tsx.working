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
import { BookOpen, Target, Users, Heart, TrendingUp, BarChart, CheckCircle, Bot, Send, Download, X } from 'lucide-react'
import { useState, useRef } from 'react'

export default function OutcomesModelToolPage() {
  const [purposeText, setPurposeText] = useState('')
  const [groupsText, setGroupsText] = useState('')
  const [needsText, setNeedsText] = useState('')
  const [goalsText, setGoalsText] = useState('')
  const [outcomesText, setOutcomesText] = useState('')

  const [purposeDone, setPurposeDone] = useState(false)
  const [groupsDone, setGroupsDone] = useState(false)
  const [needsDone, setNeedsDone] = useState(false)
  const [goalsDone, setGoalsDone] = useState(false)
  const [outcomesDone, setOutcomesDone] = useState(false)

  // AI Assistant state
  const [aiActive, setAiActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<any[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [finalOutcomesModel, setFinalOutcomesModel] = useState<any>(null)

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

  const allComponentsComplete = purposeDone && groupsDone && needsDone && goalsDone && outcomesDone
  const allFieldsHaveText = purposeText.trim() && groupsText.trim() && needsText.trim() && goalsText.trim() && outcomesText.trim()
  const readyForAI = allComponentsComplete && allFieldsHaveText

  const startAIAssistant = async () => {
    if (!readyForAI) return

    setAiActive(true)
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/outcomes-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purposeText,
          groupsText,
          needsText,
          goalsText,
          outcomesText
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
      const response = await fetch('/api/ai/outcomes-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purposeText,
          groupsText,
          needsText,
          goalsText,
          outcomesText,
          conversationHistory: newHistory,
          userMessage: messageToSend
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.type === 'final') {
          setFinalOutcomesModel(result.outcomesModel)
          setConversationHistory([...newHistory, { role: 'assistant', content: 'Perfect! I\'ve generated your complete outcomes model based on our conversation.', type: 'final' }])
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
    if (!finalOutcomesModel) return

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
        pdf.text('Outcomes Model', margin + 30, margin + 8)

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
      if (finalOutcomesModel.purpose) {
        addText('Purpose', 16, true, '#3b82f6')
        yPosition += 5
        addText(finalOutcomesModel.purpose.name, 12, true)
        yPosition += 5
        addText(finalOutcomesModel.purpose.description, 10)
        if (finalOutcomesModel.purpose.values && finalOutcomesModel.purpose.values.length > 0) {
          yPosition += 3
          addText(`Values: ${finalOutcomesModel.purpose.values.join(', ')}`, 10)
        }
        yPosition += 10
      }

      // Customer Groups
      addSection('Customer Groups', finalOutcomesModel.customerGroups, (group: any) => {
        const importance = group.importance === 'H' ? 'High' : group.importance === 'M' ? 'Medium' : 'Low'
        addText(`${group.name} (${importance} Priority)`, 11, true)
        yPosition += 3
        addText(group.description, 10)
        yPosition += 8
      })

      // Customer Needs
      addSection('Customer Needs', finalOutcomesModel.customerNeeds, (need: any) => {
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
      addSection('Strategic Goals', finalOutcomesModel.strategicGoals, (goal: any) => {
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
      addSection('Outcomes', finalOutcomesModel.outcomes, (outcome: any) => {
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
      if (finalOutcomesModel.changeImpactGuidance) {
        yPosition += 10
        addText('Change Impact Guidance', 14, true, '#1f2937')
        yPosition += 5
        addText(finalOutcomesModel.changeImpactGuidance, 10)
        yPosition += 10
      }

      // Caveat Section
      if (finalOutcomesModel.caveat) {
        yPosition += 10
        addText('Important Context', 14, true, '#ea580c')
        yPosition += 5

        if (finalOutcomesModel.caveat.acknowledgment) {
          addText(finalOutcomesModel.caveat.acknowledgment, 10)
          yPosition += 5
        }

        if (finalOutcomesModel.caveat.framingNote) {
          addText(finalOutcomesModel.caveat.framingNote, 9, false, '#6b7280')
          yPosition += 8
        }

        // Uncertainties
        if (finalOutcomesModel.caveat.uncertainties && finalOutcomesModel.caveat.uncertainties.length > 0) {
          addText('Areas You\'re Still Working Through:', 11, true)
          yPosition += 3
          finalOutcomesModel.caveat.uncertainties.forEach((uncertainty: string) => {
            addText(`• ${uncertainty}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Confidence Levels
        if (finalOutcomesModel.caveat.confidenceLevels) {
          if (finalOutcomesModel.caveat.confidenceLevels.confident && finalOutcomesModel.caveat.confidenceLevels.confident.length > 0) {
            addText('You\'re Confident About:', 11, true)
            yPosition += 3
            finalOutcomesModel.caveat.confidenceLevels.confident.forEach((item: string) => {
              addText(`• ${item}`, 9)
              yPosition += 3
            })
            yPosition += 5
          }

          if (finalOutcomesModel.caveat.confidenceLevels.questioned && finalOutcomesModel.caveat.confidenceLevels.questioned.length > 0) {
            addText('You\'re Uncertain About:', 11, true)
            yPosition += 3
            finalOutcomesModel.caveat.confidenceLevels.questioned.forEach((item: string) => {
              addText(`• ${item}`, 9)
              yPosition += 3
            })
            yPosition += 5
          }
        }

        // Strategic Choices
        if (finalOutcomesModel.caveat.strategicChoices && finalOutcomesModel.caveat.strategicChoices.length > 0) {
          addText('Strategic Decisions Still To Make:', 11, true)
          yPosition += 3
          finalOutcomesModel.caveat.strategicChoices.forEach((choice: string) => {
            addText(`• ${choice}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Implementation Challenges
        if (finalOutcomesModel.caveat.implementationChallenges && finalOutcomesModel.caveat.implementationChallenges.length > 0) {
          addText('Implementation Challenges You Identified:', 11, true)
          yPosition += 3
          finalOutcomesModel.caveat.implementationChallenges.forEach((challenge: string) => {
            addText(`• ${challenge}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Testing Approaches
        if (finalOutcomesModel.caveat.testingApproaches && finalOutcomesModel.caveat.testingApproaches.length > 0) {
          addText('Suggested Ways to Test Different Approaches:', 11, true)
          yPosition += 3
          finalOutcomesModel.caveat.testingApproaches.forEach((approach: string) => {
            addText(`• ${approach}`, 9)
            yPosition += 3
          })
          yPosition += 5
        }

        // Next Steps
        if (finalOutcomesModel.caveat.nextSteps && finalOutcomesModel.caveat.nextSteps.length > 0) {
          addText('Your Next Steps:', 11, true)
          yPosition += 3
          finalOutcomesModel.caveat.nextSteps.forEach((step: string) => {
            addText(`• ${step}`, 9)
            yPosition += 3
          })
        }
      }

      const today = new Date().toISOString().split('T')[0]
      pdf.save(`outcomes-model-${today}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }
  return (
    <>
      <div className="h-screen flex">
        {/* Fixed Sidebar */}
        <div className="w-64 h-full bg-design4-gold border-r border-design4-gold/20 p-4 flex-shrink-0">
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
                Outcomes Model Components
              </h3>
              <div className="space-y-1">
                <a href="#purpose-statement" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Target className="h-4 w-4" />
                  <span>Purpose Statement</span>
                </a>
                <a href="#customer-groups" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Users className="h-4 w-4" />
                  <span>Customer Groups</span>
                </a>
                <a href="#customer-needs" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <Heart className="h-4 w-4" />
                  <span>Customer Needs</span>
                </a>
                <a href="#strategic-goals" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <TrendingUp className="h-4 w-4" />
                  <span>Strategic Goals</span>
                </a>
                <a href="#outcomes" className="flex items-center gap-2 px-2 py-1 text-sm text-design4-ink hover:bg-design4-ink/10 rounded">
                  <BarChart className="h-4 w-4" />
                  <span>Outcomes</span>
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
                  <Card id="purpose-statement" className="bg-design4-gold scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Purpose Statement
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Define the fundamental "why" behind your organization's existence
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={purposeText}
                          onChange={(e) => setPurposeText(e.target.value)}
                          placeholder="In one or two sentences, why does this organization/initiative exist? What motivates it?"
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-gold focus:ring-design4-gold"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('purpose')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={purposeDone}
                                onCheckedChange={setPurposeDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(purposeText).colorClass}`}>
                            {getCharacterCountDisplay(purposeText).count}/500 characters
                            {getCharacterCountDisplay(purposeText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="customer-groups" className="bg-design4-gold scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Customer Groups
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Identify external stakeholders who have requirements and expectations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={groupsText}
                          onChange={(e) => setGroupsText(e.target.value)}
                          placeholder="List the key external stakeholders (customers, partners, regulators, etc.) who interact with your organization..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-gold focus:ring-design4-gold"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('groups')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={groupsDone}
                                onCheckedChange={setGroupsDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(groupsText).colorClass}`}>
                            {getCharacterCountDisplay(groupsText).count}/500 characters
                            {getCharacterCountDisplay(groupsText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="customer-needs" className="bg-design4-gold scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Customer Needs
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Specific requirements and expectations from your customer groups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={needsText}
                          onChange={(e) => setNeedsText(e.target.value)}
                          placeholder="Format each need as: 'As a <group>, I need <need> so that <benefit>'. Example: 'As a customer, I need fast delivery so that I can receive products when needed.'"
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-gold focus:ring-design4-gold"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('needs')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={needsDone}
                                onCheckedChange={setNeedsDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(needsText).colorClass}`}>
                            {getCharacterCountDisplay(needsText).count}/500 characters
                            {getCharacterCountDisplay(needsText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="strategic-goals" className="bg-design4-gold scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Strategic Goals
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Set intended outcomes that bridge purpose and customer needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={goalsText}
                          onChange={(e) => setGoalsText(e.target.value)}
                          placeholder="Define 3-5 strategic goals that connect your purpose with customer needs (e.g., increase market share, improve customer satisfaction, etc.)..."
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-gold focus:ring-design4-gold"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('goals')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={goalsDone}
                                onCheckedChange={setGoalsDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(goalsText).colorClass}`}>
                            {getCharacterCountDisplay(goalsText).count}/500 characters
                            {getCharacterCountDisplay(goalsText).isOverLimit && (
                              <span className="ml-2 text-red-600 font-medium">Over limit!</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="outcomes" className="bg-design4-gold scroll-mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg text-design4-ink flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Outcomes
                      </CardTitle>
                      <CardDescription className="text-design4-ink/70">
                        Measurable results that validate goal achievement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Textarea
                          value={outcomesText}
                          onChange={(e) => setOutcomesText(e.target.value)}
                          placeholder="What outcomes (measurable results) will you actually track to know whether each goal is achieved?"
                          className="min-h-[100px] bg-white border-design4-neutral-200 text-design4-ink placeholder:text-design4-neutral-500 focus:border-design4-gold focus:ring-design4-gold"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-design4-neutral-200 text-design4-ink hover:bg-design4-neutral-50"
                              onClick={() => setOpenVideoModal('outcomes')}
                            >
                              Show me
                            </Button>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={outcomesDone}
                                onCheckedChange={setOutcomesDone}
                                className="data-[state=checked]:bg-design4-primary"
                              />
                              <span className="text-sm text-design4-ink">Done</span>
                            </div>
                          </div>
                          <span className={`text-xs ${getCharacterCountDisplay(outcomesText).colorClass}`}>
                            {getCharacterCountDisplay(outcomesText).count}/500 characters
                            {getCharacterCountDisplay(outcomesText).isOverLimit && (
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
                {finalOutcomesModel ? (
                  <div className="h-full p-6 pl-6 overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-8 h-8 text-design4-primary" />
                          <h1 className="text-3xl font-bold text-design4-ink">
                            Final Outcomes Model
                          </h1>
                        </div>
                        <Button
                          onClick={downloadPDF}
                          className="bg-design4-primary hover:bg-design4-primary/90 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                      <p className="text-design4-neutral-600 mb-6">
                        Your complete outcomes model with full traceability and alignment.
                      </p>
                    </div>

                    <div ref={pdfContentRef} className="space-y-6">
                      {/* Purpose */}
                      <Card className="border-design4-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-primary">
                            <Target className="w-5 h-5" />
                            Purpose
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h3 className="font-semibold text-design4-ink mb-2">{finalOutcomesModel.purpose.name}</h3>
                          <p className="text-design4-neutral-600 mb-3">{finalOutcomesModel.purpose.description}</p>
                          {finalOutcomesModel.purpose.values && finalOutcomesModel.purpose.values.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-design4-ink">Values: </span>
                              <span className="text-sm text-design4-neutral-600">{finalOutcomesModel.purpose.values.join(', ')}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Customer Groups */}
                      <Card className="border-design4-gold/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-gold">
                            <Users className="w-5 h-5" />
                            Customer Groups
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {finalOutcomesModel.customerGroups.map((group: any, index: number) => (
                              <div key={index} className="border-l-2 border-design4-gold/30 pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-design4-ink">{group.name}</h4>
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                                    group.importance === 'H' ? 'bg-red-100 text-red-700' :
                                    group.importance === 'M' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {group.importance} Priority
                                  </span>
                                </div>
                                <p className="text-sm text-design4-neutral-600">{group.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Customer Needs */}
                      <Card className="border-design4-green/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-green">
                            <Heart className="w-5 h-5" />
                            Customer Needs
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {finalOutcomesModel.customerNeeds.map((need: any, index: number) => (
                              <div key={index} className="border-l-2 border-design4-green/30 pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-design4-ink">{need.name}</h4>
                                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                                    need.criticality === 'H' ? 'bg-red-100 text-red-700' :
                                    need.criticality === 'M' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {need.criticality} Critical
                                  </span>
                                </div>
                                <p className="text-sm text-design4-neutral-600 mb-2">{need.description}</p>
                                <div className="text-xs text-design4-neutral-500">
                                  <span className="font-medium">Groups:</span> {need.groups.join(', ')}
                                </div>
                                {need.acceptanceSignals && (
                                  <div className="text-xs text-design4-neutral-500 mt-1">
                                    <span className="font-medium">Success Signals:</span> {need.acceptanceSignals}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Strategic Goals */}
                      <Card className="border-design4-orange/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-orange">
                            <TrendingUp className="w-5 h-5" />
                            Strategic Goals
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {finalOutcomesModel.strategicGoals.map((goal: any, index: number) => (
                              <div key={index} className="border-l-2 border-design4-orange/30 pl-3">
                                <h4 className="font-medium text-design4-ink mb-2">{goal.name}</h4>
                                <p className="text-sm text-design4-neutral-600 mb-3">{goal.description}</p>
                                <div className="grid grid-cols-2 gap-2 text-xs text-design4-neutral-500">
                                  <div><span className="font-medium">Metric:</span> {goal.metric}</div>
                                  <div><span className="font-medium">Target:</span> {goal.target}</div>
                                  <div><span className="font-medium">Timeline:</span> {goal.timeframe}</div>
                                  <div><span className="font-medium">Owner:</span> {goal.owner}</div>
                                </div>
                                {goal.contributingNeeds && goal.contributingNeeds.length > 0 && (
                                  <div className="text-xs text-design4-neutral-500 mt-2">
                                    <span className="font-medium">Addresses Needs:</span> {goal.contributingNeeds.join(', ')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Outcomes */}
                      <Card className="border-design4-plum/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-design4-plum">
                            <BarChart className="w-5 h-5" />
                            Outcomes
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {finalOutcomesModel.outcomes.map((outcome: any, index: number) => (
                              <div key={index} className="border-l-2 border-design4-plum/30 pl-3">
                                <h4 className="font-medium text-design4-ink mb-2">{outcome.name}</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs text-design4-neutral-500 mb-2">
                                  <div><span className="font-medium">Measure:</span> {outcome.measure}</div>
                                  <div><span className="font-medium">Baseline:</span> {outcome.baseline}</div>
                                  <div><span className="font-medium">Target:</span> {outcome.target}</div>
                                  <div><span className="font-medium">Frequency:</span> {outcome.frequency}</div>
                                </div>
                                <div className="text-xs text-design4-neutral-500">
                                  <div><span className="font-medium">Data Source:</span> {outcome.dataSource}</div>
                                  <div><span className="font-medium">Achieves Goals:</span> {outcome.achievesGoals.join(', ')}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Change Impact Guidance */}
                      {finalOutcomesModel.changeImpactGuidance && (
                        <Card className="border-design4-neutral-200">
                          <CardHeader>
                            <CardTitle className="text-design4-ink">Change Impact Guidance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-design4-neutral-600">{finalOutcomesModel.changeImpactGuidance}</p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Caveat Section */}
                      {finalOutcomesModel.caveat && (
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
                              <p className="text-design4-ink mb-3">{finalOutcomesModel.caveat.acknowledgment}</p>
                              <p className="text-sm text-design4-neutral-600 mb-3">{finalOutcomesModel.caveat.framingNote}</p>
                            </div>

                            {finalOutcomesModel.caveat.uncertainties && finalOutcomesModel.caveat.uncertainties.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Areas You're Still Working Through:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalOutcomesModel.caveat.uncertainties.map((uncertainty: string, index: number) => (
                                    <li key={index}>{uncertainty}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalOutcomesModel.caveat.confidenceLevels && (
                              <div className="grid md:grid-cols-2 gap-4">
                                {finalOutcomesModel.caveat.confidenceLevels.confident && finalOutcomesModel.caveat.confidenceLevels.confident.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink mb-2 flex items-center gap-2">
                                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                      You're Confident About:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                      {finalOutcomesModel.caveat.confidenceLevels.confident.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {finalOutcomesModel.caveat.confidenceLevels.questioned && finalOutcomesModel.caveat.confidenceLevels.questioned.length > 0 && (
                                  <div>
                                    <h4 className="font-medium text-design4-ink mb-2 flex items-center gap-2">
                                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                      You're Uncertain About:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                      {finalOutcomesModel.caveat.confidenceLevels.questioned.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {finalOutcomesModel.caveat.strategicChoices && finalOutcomesModel.caveat.strategicChoices.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Strategic Decisions Still To Make:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalOutcomesModel.caveat.strategicChoices.map((choice: string, index: number) => (
                                    <li key={index}>{choice}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalOutcomesModel.caveat.implementationChallenges && finalOutcomesModel.caveat.implementationChallenges.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Implementation Challenges You Identified:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalOutcomesModel.caveat.implementationChallenges.map((challenge: string, index: number) => (
                                    <li key={index}>{challenge}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalOutcomesModel.caveat.testingApproaches && finalOutcomesModel.caveat.testingApproaches.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Suggested Ways to Test Different Approaches:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalOutcomesModel.caveat.testingApproaches.map((approach: string, index: number) => (
                                    <li key={index}>{approach}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {finalOutcomesModel.caveat.nextSteps && finalOutcomesModel.caveat.nextSteps.length > 0 && (
                              <div>
                                <h4 className="font-medium text-design4-ink mb-2">Your Next Steps:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-design4-neutral-600">
                                  {finalOutcomesModel.caveat.nextSteps.map((step: string, index: number) => (
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
                        <Bot className="w-6 h-6 text-design4-primary" />
                        <h2 className="text-xl font-semibold text-design4-ink">AI Outcomes Model Assistant</h2>
                      </div>
                      <p className="text-sm text-design4-neutral-600 mt-1">Refining your outcomes model with AI guidance</p>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {conversationHistory.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-3xl rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-design4-primary text-white'
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
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-design4-primary"></div>
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
                          className="flex-1 px-4 py-2 border border-design4-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-design4-primary focus:border-design4-primary"
                          disabled={isLoading}
                        />
                        <Button
                          onClick={() => sendMessage()}
                          disabled={isLoading || !currentMessage.trim()}
                          className="bg-design4-primary hover:bg-design4-primary/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : readyForAI ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-design4-primary mx-auto mb-6" />
                      <h1 className="text-2xl font-bold text-design4-ink mb-4">
                        Ready for Design4 AI Enhancement!
                      </h1>
                      <p className="text-design4-neutral-600 mb-6 max-w-md">
                        All components are complete. Start the Design4 Outcomes Model AI assistant to refine your outcomes model with expert guidance.
                      </p>
                      <Button
                        onClick={startAIAssistant}
                        disabled={isLoading}
                        className="bg-design4-primary hover:bg-design4-primary/90 text-white px-6 py-3 text-lg"
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
                        Outcomes Model Progress
                      </h1>
                      <p className="text-design4-neutral-600 mb-6">
                        Complete all sections and mark them done to unlock Design4 AI assistance.
                      </p>
                      <div className="space-y-3 text-left max-w-sm">
                        <div className={`flex items-center gap-3 ${purposeDone && purposeText.trim() ? 'text-design4-primary' : 'text-design4-neutral-400'}`}>
                          {purposeDone && purposeText.trim() ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />}
                          <span>Purpose Statement</span>
                        </div>
                        <div className={`flex items-center gap-3 ${groupsDone && groupsText.trim() ? 'text-design4-primary' : 'text-design4-neutral-400'}`}>
                          {groupsDone && groupsText.trim() ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />}
                          <span>Customer Groups</span>
                        </div>
                        <div className={`flex items-center gap-3 ${needsDone && needsText.trim() ? 'text-design4-primary' : 'text-design4-neutral-400'}`}>
                          {needsDone && needsText.trim() ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />}
                          <span>Customer Needs</span>
                        </div>
                        <div className={`flex items-center gap-3 ${goalsDone && goalsText.trim() ? 'text-design4-primary' : 'text-design4-neutral-400'}`}>
                          {goalsDone && goalsText.trim() ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />}
                          <span>Strategic Goals</span>
                        </div>
                        <div className={`flex items-center gap-3 ${outcomesDone && outcomesText.trim() ? 'text-design4-primary' : 'text-design4-neutral-400'}`}>
                          {outcomesDone && outcomesText.trim() ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border border-design4-neutral-300 rounded-full" />}
                          <span>Outcomes</span>
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
            {openVideoModal === 'purpose' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Purpose Statement Video</h3>
                  <p className="text-gray-300">Learn how to craft compelling purpose statements</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'groups' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer Groups Video</h3>
                  <p className="text-gray-300">Identify and categorize your customer segments</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'needs' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer Needs Video</h3>
                  <p className="text-gray-300">Understand and document customer requirements</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'goals' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Goals Video</h3>
                  <p className="text-gray-300">Define SMART strategic objectives</p>
                  <p className="text-sm text-gray-400 mt-4">Video content coming soon...</p>
                </div>
              </div>
            )}
            {openVideoModal === 'outcomes' && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Outcomes Video</h3>
                  <p className="text-gray-300">Measure and track meaningful outcomes</p>
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