const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateCMHAFormatting() {
  try {
    console.log('🎨 Updating CMHA blog post formatting...')
    
    // Enhanced HTML content with better formatting and visual elements
    const enhancedContent = `
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">The Challenge</h3>
            <p class="text-gray-700 leading-relaxed">CMHA Toronto operated over 50 client-facing programs with a multi-purpose Balanced Scorecard that created confusion between strategic and operational discussions. The complexity was overwhelming stakeholders and preventing clear communication about organizational impact.</p>
          </div>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">The Transformation Journey</h2>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">When CMHA Toronto faced the challenge of managing performance across 50+ diverse mental health programs, they turned to the <strong class="text-blue-600">Design4 Framework</strong> - a systematic approach that ensures organizational activities align with purpose while adapting to changing circumstances.</p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
        <div class="text-center bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-400">
          <div class="text-4xl font-bold text-red-500 mb-2">50+</div>
          <div class="text-sm text-gray-600 font-medium">Programs Simplified into</div>
        </div>
        <div class="text-center bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-400">
          <div class="text-4xl font-bold text-green-500 mb-2">8</div>
          <div class="text-sm text-gray-600 font-medium">Core Service Categories</div>
        </div>
        <div class="text-center bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400">
          <div class="text-4xl font-bold text-blue-500 mb-2">4</div>
          <div class="text-sm text-gray-600 font-medium">Design4 Framework Phases</div>
        </div>
        <div class="text-center bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-400">
          <div class="text-4xl font-bold text-purple-500 mb-2">100%</div>
          <div class="text-sm text-gray-600 font-medium">Stakeholder Alignment</div>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">The Design4 Framework in Action</h2>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">Rather than treating performance management as disconnected metrics, the Design4 approach recognizes that meaningful performance emerges from the alignment between an organization's deepest purpose (its "why"), its strategic choices, its capabilities, and its operational delivery.</p>

      <div class="grid md:grid-cols-2 gap-8 my-12">
        <div class="bg-white rounded-xl shadow-lg border-t-4 border-red-400 p-8 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg mr-4">1</div>
            <h3 class="text-xl font-bold text-gray-900">Discover - Are We Getting the Benefits?</h3>
          </div>
          <p class="text-gray-700 mb-4"><strong class="text-red-600">Value and Outcomes Focus:</strong> CMHA Toronto anchored all performance activities in their fundamental purpose - supporting individuals' mental health recovery through comprehensive community-based services.</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Purpose clarification using Simon Sinek's Golden Circle
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Stakeholder value mapping
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Current state assessment of value streams
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg border-t-4 border-green-400 p-8 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg mr-4">2</div>
            <h3 class="text-xl font-bold text-gray-900">Define - Are We Doing the Right Things?</h3>
          </div>
          <p class="text-gray-700 mb-4"><strong class="text-green-600">Strategy Alignment:</strong> Translated discovered purpose into clear strategic choices using Roger Martin's Playing to Win framework and aligned diverse programs with standardized service categories.</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Strategic clarity through winning aspiration
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Service portfolio definition with MH&A core services
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Success metrics establishment
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg border-t-4 border-blue-400 p-8 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4">3</div>
            <h3 class="text-xl font-bold text-gray-900">Develop - Are We Doing Things Right?</h3>
          </div>
          <p class="text-gray-700 mb-4"><strong class="text-blue-600">Capabilities Design:</strong> Built and optimized capabilities using Alex Osterwalder's Business Model Canvas and conducted capability gap analysis to ensure effective service delivery.</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Business model design with value proposition mapping
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Capability assessment across service areas
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Service integration across value streams
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg border-t-4 border-purple-400 p-8 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg mr-4">4</div>
            <h3 class="text-xl font-bold text-gray-900">Deliver - Are We Getting Things Done Well?</h3>
          </div>
          <p class="text-gray-700 mb-4"><strong class="text-purple-600">Operational Excellence:</strong> Implemented monitoring systems aligned with Quadruple Aim and Accreditation Canada standards, with continuous improvement processes.</p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Implementation management with clear accountability
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Quality assurance monitoring
            </li>
            <li class="flex items-start">
              <span class="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Continuous improvement culture
            </li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">Key Innovation: Service-Oriented Operating Model</h2>

      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Innovation</h3>
            <p class="text-gray-700 leading-relaxed">CMHA Toronto's breakthrough was recognizing themselves as a <strong class="text-orange-600">service provider</strong> with two essential components: <strong>Client-Facing Services</strong> (30 services across 9 core categories) and <strong>Support Services</strong> (36 services across 7 categories) that enable client-facing services.</p>
          </div>
        </div>
      </div>

      <h3 class="text-2xl font-semibold text-gray-800 mb-4">The Four "Ares" Governance Framework</h3>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">The Design4 approach operationalized through CMHA Toronto's continuous governance cycle:</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h4 class="font-semibold text-blue-800 mb-2">1. Are we doing the right things?</h4>
          <p class="text-blue-700 text-sm">(Strategy) - Ensuring alignment with desired outcomes</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <h4 class="font-semibold text-green-800 mb-2">2. Are we doing them the right way?</h4>
          <p class="text-green-700 text-sm">(Capabilities) - Efficient resource utilization</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <h4 class="font-semibold text-purple-800 mb-2">3. Are we getting them done well?</h4>
          <p class="text-purple-700 text-sm">(Delivery) - Effective operations and compliance</p>
        </div>
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <h4 class="font-semibold text-red-800 mb-2">4. Are we getting the benefits?</h4>
          <p class="text-red-700 text-sm">(Value) - Creating stakeholder value and continuous improvement</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">Integrated Quality Framework</h2>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">The implementation integrated multiple quality perspectives:</p>

      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="text-2xl mr-3">📊</span>
            Quadruple Aim Dimensions
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Better patient and caregiver experience
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Better population health outcomes
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Better value and efficiency
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Better provider experience
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-400">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="text-2xl mr-3">🏆</span>
            Accreditation Canada Quality Domains
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Client-centered/recovery-focused
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Timely/accessible
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Equitable/accessible
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Safe, effective, efficient
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Continuity of services
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-400">
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span class="text-2xl mr-3">📈</span>
            Performance Indicators
          </h3>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              External benchmarking capabilities
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Roll-up reporting from programs to board
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Focus on outcomes over outputs
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Evidence-based measurement
            </li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">Transformational Results</h2>

      <div class="bg-gradient-to-r from-gray-50 to-blue-50 border-l-4 border-gray-400 p-8 rounded-r-lg mb-8 italic">
        <div class="flex items-start">
          <div class="text-6xl text-gray-300 font-serif mr-4">"</div>
          <div>
            <p class="text-xl text-gray-700 leading-relaxed mb-4">The revised approach articulates our support for clients through their mental health journey and allows us to discuss our community impact beyond individual program summation.</p>
            <p class="text-lg font-semibold text-gray-800">— CMHA Toronto Leadership Team</p>
          </div>
        </div>
      </div>

      <h3 class="text-2xl font-semibold text-gray-800 mb-6">Key Achievements:</h3>

      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-400">
          <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span class="text-2xl mr-3">🎯</span>
            Demonstrate Value
          </h4>
          <p class="text-gray-700">Clearly quantify and communicate service impact to clients, donors, funders, and community partners.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-400">
          <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span class="text-2xl mr-3">📈</span>
            Improve Services
          </h4>
          <p class="text-gray-700">Create systematic feedback loops for continuous quality improvement based on client outcomes rather than just activity metrics.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-400">
          <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span class="text-2xl mr-3">🧭</span>
            Support Decision-Making
          </h4>
          <p class="text-gray-700">Provide leadership with integrated performance data connecting operational activities to strategic outcomes.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
          <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span class="text-2xl mr-3">🔄</span>
            Enable Adaptation
          </h4>
          <p class="text-gray-700">Build organizational capability to respond to changing client needs, sector requirements, and funding environments.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-400 md:col-span-2">
          <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span class="text-2xl mr-3">⚖️</span>
            Foster Accountability
          </h4>
          <p class="text-gray-700">Create clear connections between individual, program, and organizational performance supporting both achievement and learning.</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">Implementation Insights</h2>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-2xl font-semibold text-green-600 mb-4">Success Factors</h3>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div><strong>Start with purpose,</strong> not available data</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div><strong>Leverage proven frameworks</strong> rather than creating from scratch</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div><strong>Balance stakeholder needs</strong> - internal improvement and external accountability</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div><strong>Focus on outcomes</strong> that matter to beneficiaries, not just activity measures</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div><strong>Design for sustainability</strong> through manageable data collection and meaningful insights</div>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-2xl font-semibold text-blue-600 mb-4">Key Learnings</h3>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div><strong>Data Quality is Critical:</strong> Performance measurement is only as good as underlying data</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div><strong>Change Management Matters:</strong> Staff involvement in framework development increases adoption</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div><strong>Technology Enables, People Execute:</strong> User-friendly systems with strong training support</div>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div><strong>External Accountability Integration:</strong> One system serving multiple reporting requirements</div>
            </li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">The Bigger Picture</h2>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">CMHA Toronto's success demonstrates how systematic methodology can transform organizational performance measurement from burden to competitive advantage. By moving from 50+ fragmented programs to 8 coherent service categories, they proved that <strong class="text-blue-600">clarity and focus drive better outcomes than comprehensive complexity</strong>.</p>

      <div class="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Universal Lesson</h3>
            <p class="text-gray-700 leading-relaxed"><strong>Sustainable performance emerges not from perfect execution of predetermined plans, but from the continuous alignment of purpose, strategy, capabilities, and operations in service of the communities organizations exist to support.</strong></p>
          </div>
        </div>
      </div>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">The transformation delivered tangible benefits: improved communication, reduced complexity, enhanced decision-making capability, and stronger stakeholder relationships. Most importantly, it enabled CMHA Toronto to tell their story coherently - articulating their support for clients through their mental health journey and demonstrating community impact beyond individual program statistics.</p>

      <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200">Looking Forward</h2>

      <p class="text-lg text-gray-700 leading-relaxed mb-6">For organizations facing similar performance measurement challenges, CMHA Toronto's experience offers a proven pathway: start with clarity of purpose, build on established standards, and focus relentlessly on outcomes that matter to the people you serve.</p>

      <p class="text-lg text-gray-700 leading-relaxed mb-8">The journey toward mature performance management is ongoing, but CMHA Toronto's experience demonstrates that success requires sustained commitment to both technical excellence and cultural change. The Design4 framework provided the structure and tools for this journey, but the real transformation happened in daily decisions, conversations, and improvements that accumulated over time into enhanced organizational capability and measurable community impact.</p>

      <div class="flex flex-wrap gap-3 justify-center mt-8">
        <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Design4 Framework</span>
        <span class="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">Performance Management</span>
        <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">Mental Health Services</span>
        <span class="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">Service Design</span>
        <span class="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">Organizational Transformation</span>
        <span class="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">Quadruple Aim</span>
        <span class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">Quality Improvement</span>
      </div>
    `
    
    // Update the blog post in the database
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        content: enhancedContent
      })
      .eq('slug', 'cmha-toronto-design4-transformation')
    
    if (error) {
      console.error('❌ Error updating blog post:', error)
      return
    }
    
    console.log('✅ Successfully updated CMHA blog post formatting!')
    console.log('🎨 Enhanced with:')
    console.log('  - Colored stat cards with visual hierarchy')
    console.log('  - Four-phase framework cards with icons and color coding')
    console.log('  - Visual highlight boxes with icons')
    console.log('  - Structured lists with checkmarks and bullets')
    console.log('  - Quote styling with visual emphasis')
    console.log('  - Achievement cards with emojis and icons')
    console.log('  - Success factors and learnings with structured presentation')
    console.log('  - Gradient topic tags')
    
  } catch (error) {
    console.error('❌ Failed to update formatting:', error.message)
    process.exit(1)
  }
}

updateCMHAFormatting()