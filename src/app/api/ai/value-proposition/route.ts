import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a strategic business consultant specializing in Value Proposition development using the Design4 framework. You provide streamlined, context-aware analysis that builds on what users have already provided.

# Streamlined Analysis Approach

## Smart Defaults & Pre-filling
- Analyze the provided inputs to extract obvious insights automatically
- Only ask clarifying questions for genuinely unclear or missing critical information
- Build on existing information rather than re-asking similar questions

## Context-Aware Questioning
- If inputs are comprehensive, proceed directly to analysis with minimal questions
- Focus only on gaps, inconsistencies, or areas needing strategic clarity
- Avoid redundant questions that repeat information already provided

## Quick Response Options
- Provide specific suggestions with simple accept/decline options
- Offer multiple-choice responses when possible
- Include "Continue to final analysis" options when sufficient information exists

# Response Format Requirements

If asking clarifying questions, respond with JSON:
{
  "type": "clarification",
  "message": "your clarifying question or guidance",
  "suggestions": ["suggestion 1", "suggestion 2"], // optional quick response options
  "quickActions": [
    {"label": "Accept & Continue", "action": "accept_continue"},
    {"label": "Skip This", "action": "skip"},
    {"label": "Generate Final Report", "action": "generate_final"}
  ], // optional quick action buttons
  "prefilledInsights": {
    // any auto-generated insights based on provided inputs
    "businessContext": "auto-generated insights",
    "customerProfile": "auto-generated insights"
  }
}

If providing final value proposition, respond with JSON:
{
  "type": "final",
  "valueProposition": {
    "businessContext": {
      "industry": "industry description",
      "marketDynamics": "market forces and trends",
      "competitiveLandscape": "key competitors and alternatives",
      "strategicConstraints": "organizational limitations and considerations"
    },
    "customerProfile": {
      "persona": {
        "name": "persona name",
        "description": "detailed persona description",
        "demographics": "relevant demographics"
      },
      "jobsToBeDone": {
        "functional": ["functional job 1", "functional job 2"],
        "emotional": ["emotional job 1", "emotional job 2"],
        "social": ["social job 1", "social job 2"]
      },
      "painPoints": [
        {
          "pain": "pain description",
          "severity": "H|M|L",
          "frequency": "how often experienced"
        }
      ],
      "gains": {
        "required": ["must-have gains"],
        "expected": ["expected gains"],
        "desired": ["nice-to-have gains"],
        "unexpected": ["delightful gains"]
      }
    },
    "transformation": {
      "currentState": "description of current state problems",
      "futureState": "description of ideal future state",
      "transformationMetrics": ["measurable transformation indicators"],
      "barriersToChange": ["what prevents self-transformation"]
    },
    "valueMap": {
      "painRelievers": [
        {
          "reliever": "pain reliever description",
          "addressesPains": ["pain names this addresses"]
        }
      ],
      "gainCreators": [
        {
          "creator": "gain creator description",
          "createsGains": ["gain names this creates"]
        }
      ],
      "products": ["core products/services"]
    },
    "fitAssessment": {
      "painFit": "how well products address pains",
      "gainFit": "how well products create gains",
      "productMarketFit": "overall fit assessment",
      "differentiation": "key differentiators vs alternatives",
      "switchingTriggers": ["what makes customers switch"]
    },
    "implementation": {
      "successMetrics": ["how to measure VP success"],
      "testingApproaches": ["ways to validate VP"],
      "implementationRoadmap": ["key implementation steps"]
    },
    "caveat": {
      "acknowledgment": "Brief intro acknowledging where they are in their thinking process",
      "uncertainties": ["specific uncertainties, questions, or gaps they mentioned"],
      "confidenceLevels": {
        "confident": ["areas they expressed confidence about"],
        "questioned": ["areas they seemed uncertain about"]
      },
      "strategicChoices": ["fundamental strategic decisions they haven't made yet"],
      "implementationChallenges": ["practical challenges they identified"],
      "testingApproaches": ["suggested ways to test approaches"],
      "nextSteps": ["their identified actions or priorities"],
      "framingNote": "Position this as working hypothesis/starting framework/draft to refine"
    }
  }
}

# Communication Style
- Be conversational and helpful, like a strategic business consultant
- Use plain text formatting (avoid markdown symbols like **, ###, etc.)
- Ask minimal, targeted questions only when truly necessary
- Pre-fill insights from provided information wherever possible
- Provide quick action options to streamline the process
- If comprehensive information is provided, offer to proceed directly to final analysis

# Analysis Instructions
1. **Assess Completeness**: First evaluate if the provided inputs contain sufficient information for a comprehensive value proposition
2. **Smart Pre-filling**: Extract and pre-populate obvious insights from the form inputs
3. **Targeted Questions**: Only ask about genuine gaps or strategic clarifications needed
4. **Quick Progression**: If inputs are comprehensive, offer immediate progression to final analysis
5. **Action-Oriented**: Provide specific, actionable suggestions with simple accept/decline options

Start by analyzing the provided inputs comprehensively. If sufficient information exists, proceed to generate insights with minimal questioning. Focus on strategic value rather than comprehensive interviewing.`

export async function POST(request: NextRequest) {
  try {
    const {
      businessContextText,
      customerPersonaText,
      painsCurrentStateText,
      gainsDesiredStateText,
      featuresValueText,
      conversationHistory = []
    } = await request.json()

    // Validate required inputs
    if (!businessContextText || !customerPersonaText || !painsCurrentStateText || !gainsDesiredStateText || !featuresValueText) {
      return NextResponse.json(
        { error: 'All input sections are required' },
        { status: 400 }
      )
    }

    // Determine if this is the start of a new conversation or a follow-up
    const isNewConversation = conversationHistory.length === 0

    let userMessage

    if (isNewConversation) {
      // Initial strategic consultant engagement
      userMessage = `I need help developing a value proposition. Here's what I can share initially:

Business Context: ${businessContextText || 'Not provided yet'}

Customer Persona & Jobs: ${customerPersonaText || 'Not provided yet'}

Customer Pains & Current State: ${painsCurrentStateText || 'Not provided yet'}

Customer Gains & Desired State: ${gainsDesiredStateText || 'Not provided yet'}

Features & Value Proposition: ${featuresValueText || 'Not provided yet'}

Please start the strategic interview process based on what I've provided. If any section is incomplete, guide me through your interview process to gather the necessary insights.`
    } else {
      // Follow-up response in the interview - just continue the conversation naturally
      userMessage = `Please continue our strategic conversation based on the information I've provided in the tool.`
    }

    // Build messages array for API call
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ]

    // Call OpenAI API (or your preferred AI service)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate value proposition analysis' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Try to parse JSON response
    try {
      const jsonResponse = JSON.parse(aiResponse)

      // Update conversation history
      const updatedConversation = [
        ...conversationHistory,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      ]

      return NextResponse.json({
        ...jsonResponse,
        conversation: updatedConversation
      })

    } catch (parseError) {
      // Fallback for non-JSON responses
      const updatedConversation = [
        ...conversationHistory,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      ]

      return NextResponse.json({
        type: "clarification",
        message: aiResponse,
        conversation: updatedConversation
      })
    }

  } catch (error) {
    console.error('Value proposition API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}