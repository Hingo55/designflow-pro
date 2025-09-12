import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TransformationLeaderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Hero Section */}
        <section className="bg-design4-teal">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                  For Transformation Leaders
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Align your leadership team.
                </h1>
                <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto lg:mx-0 mb-8">
                  Stop the cycle of competing priorities and siloed departments. The Design4 Framework creates leadership alignment that drives sustainable performance at every level of your organization.
                </p>
              </div>
              
              {/* Transformation Leader Graphic */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="w-80 h-80 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 128 128"
                    className="w-64 h-64"
                    aria-label="Transformation Leader"
                  >
                    <path 
                      fill="#E5C823"
                      d="M109.01368,22.7568C96.373-2.2187,69.27338-.0508,67.56638.1152,38.06928,1.5938,25.45308,22,24.17188,35.3633c-.3155,3.2676.0498,13.1133.0498,14.7402a3.70936,3.70936,0,0,1-.2549,1.1485s-10.1943,21.2089-10.1973,21.2138a2.7102,2.7102,0,0,0,2.4463,3.8711h5.2334l-.57618,5.374a2.00114,2.00114,0,0,0,.49908,1.5528c.0156.0176,2.4287,2.8506,2.4648,2.8916l-1.7705,2.8603a1.936,1.936,0,0,0,.26862,2.4688c.01948.0185,1.77828,2.0586.52238,7.7148a6.01765,6.01765,0,0,0,1.5889,5.5156c1.9609,2.0557,5.1172,2.8604,8.666,2.2002,3.0215-.5586,7.3506-.1298,9.71,2.125,2.2431,2.1475,3.3711,5.5166,3.5488,10.5987.0742,2.1484.0547,4.2519-.0596,6.249A1.9962,1.9962,0,0,0,48.17578,128a2.05387,2.05387,0,0,0,2.0908-1.8828,55.52892,55.52892,0,0,0,.0635-6.6192c-.1377-3.9003-.7832-9.5312-4.7842-13.3623-3.6133-3.4521-9.3408-3.8593-13.1475-3.1552-2.1787.4033-4.0908.0156-5.0996-1.042a2.01858,2.01858,0,0,1-.5752-1.8672c1.1621-5.2334.2481-8.3926-.6162-10.0381,0,0,1.3955-2.2637,1.4307-2.3389.6494-1.4433.7676-2.4228-.3809-3.7675-.0888-.1006-1.6865-2.0293-2.2509-2.6719l.71972-6.7061a2.013,2.013,0,0,0-.49512-1.5498,1.96934,1.96934,0,0,0-1.4746-.6631h-5.4239l9.294-19.332a7.39554,7.39554,0,0,0,.6552-2.9004c0-1.7031-.3593-11.3535-.0693-14.3535,1.1514-11.9883,12.6738-30.3057,39.6953-31.6426.043-.0029,25.96-2.6826,37.6797,20.4697a47.2743,47.2743,0,0,1,2.0996,37.7139c-1.7226,4.6358-6.5488,14.5469-6.5488,14.5469-3.12008,6.4053-6.1504,13.3408-7.208,20.6504a1.9806,1.9806,0,1,0,3.91792.583c.97858-6.7666,3.86818-13.3545,6.84578-19.4688,0,0,4.9091-10.0849,6.7011-14.9033A51.31939,51.31939,0,0,0,109.01368,22.7568Z" 
                    />
                    <path 
                      fill="#E5C823"
                      d="M86.53908 55.042a5.06366 5.06366 0 0 0-1.1953-3.29 5.05646 5.05646 0 0 0 2.2304-.7637h-6.623c-.0508.0996-.0918.2041-.1446.3027a1.57047 1.57047 0 0 0 .2247 1.7754l1.1816 1.1856a1.11048 1.11048 0 0 1 0 1.5732l-2.3652 2.3672a1.13 1.13 0 0 1-1.5782 0l-1.1816-1.1797a1.557 1.557 0 0 0-1.7774-.2246 13.46333 13.46333 0 0 1-2.414 1.0039 1.5742 1.5742 0 0 0-1.1016 1.416v1.668a1.11548 1.11548 0 0 1-1.1152 1.1123h-3.3379a1.11385 1.11385 0 0 1-1.1191-1.1123V59.208A1.56852 1.56852 0 0 0 65.127 57.792a13.59766 13.59766 0 0 1-2.42192-1.0039 1.5537 1.5537 0 0 0-1.7754.2246L59.748 58.1924a1.12787 1.12787 0 0 1-1.57422 0l-2.3691-2.3672a1.11743 1.11743 0 0 1 0-1.5732l1.1816-1.1856a1.56616 1.56616 0 0 0 .2246-1.7754 13.30324 13.30324 0 0 1-1.0058-2.4199A1.56678 1.56678 0 0 0 54.791 47.7715H53.127a1.11039 1.11039 0 0 1-1.11532-1.1113V43.3154A1.11011 1.11011 0 0 1 53.127 42.2051h1.664a1.56692 1.56692 0 0 0 1.41408-1.0996 13.36047 13.36047 0 0 1 1.0058-2.42 1.566 1.566 0 0 0-.2246-1.7753l-1.1816-1.1856a1.11633 1.11633 0 0 1 0-1.5723l2.3691-2.3681a1.125 1.125 0 0 1 1.57422 0l1.18168 1.1797a1.55442 1.55442 0 0 0 1.7754.2246 13.7548 13.7548 0 0 1 2.41792-1.003 1.57484 1.57484 0 0 0 1.09968-1.4169V29.1035a1.11631 1.11631 0 0 1 1.1191-1.1152h3.3379a1.118 1.118 0 0 1 1.1152 1.1152v1.6651a1.57685 1.57685 0 0 0 1.1016 1.4169 13.5335 13.5335 0 0 1 2.414 1.003 1.55531 1.55531 0 0 0 1.7774-.2246l1.1816-1.1797a1.128 1.128 0 0 1 1.5782 0l2.3652 2.3681a1.1094 1.1094 0 0 1 0 1.5723l-1.1816 1.1856a1.57033 1.57033 0 0 0-.2247 1.7753c.0528.0977.0938.2032.1446.3028h6.623a5.047 5.047 0 0 0-2.2304-.7637 5.11042 5.11042 0 0 0-.3165-6.9131l-2.3496-2.3545a5.12175 5.12175 0 0 0-6.9023-.3076 5.12253 5.12253 0 0 0-5.0957-4.6611h-3.3379a5.125 5.125 0 0 0-5.0996 4.6621 5.11521 5.11521 0 0 0-6.8906.2988l-2.375 2.374a5.129 5.129 0 0 0-.3008 6.9014 5.11968 5.11968 0 0 0-4.6641 5.0908v3.3448a5.12006 5.12006 0 0 0 4.6641 5.0918 5.13113 5.13113 0 0 0 .2949 6.8955l2.377 2.374a5.114 5.114 0 0 0 6.8945.3056 5.12211 5.12211 0 0 0 5.0996 4.6612h3.3379a5.11982 5.11982 0 0 0 5.0957-4.6612 5.12032 5.12032 0 0 0 6.8965-.3027L85.043 58.6523A5.06211 5.06211 0 0 0 86.53908 55.042zM38.02728 43.9668c-.0117.3389-.0156 1.0791-.0156 1.0791a1.97556 1.97556 0 0 0 2 1.9717 2.026 2.026 0 0 0 2-2.0293c0-.2969.0039-.5928.0137-.8867a2.00019 2.00019 0 0 0-3.9981-.1348zM40.793 37.9893a2.01756 2.01756 0 0 0 2.51558-1.293c.0957-.2979.1973-.5947.3027-.8887a1.99994 1.99994 0 1 0-3.7597-1.3652q-.18465.5112-.35158 1.0312A1.99907 1.99907 0 0 0 40.793 37.9893zM94.02928 26.6777a2.00011 2.00011 0 1 0-3.2246 2.3672q.27825.378.541.7666a1.99976 1.99976 0 1 0 3.3066-2.25Q94.34763 27.1148 94.02928 26.6777zM43.957 63.249a2.021 2.021 0 0 0 2.795.4356 1.99909 1.99909 0 0 0 .43548-2.795c-.1836-.2529-.3652-.5087-.541-.7695a2.00031 2.00031 0 1 0-3.3106 2.2461C43.53708 62.6641 43.74608 62.959 43.957 63.249zM39.53708 54.6201a2.02606 2.02606 0 0 0 2.5215 1.2813 1.99855 1.99855 0 0 0 1.2812-2.5215c-.0976-.2988-.1894-.5986-.2753-.9014a2.00007 2.00007 0 1 0-3.8438 1.1074Q39.37008 54.10745 39.53708 54.6201zM53.168 66.8545q-.38387-.2784-.75592-.5693A2.00024 2.00024 0 1 0 49.959 69.4453c.28318.2197.57028.4365.86128.6475A1.9999 1.9999 0 0 0 53.168 66.8545zM60.69918 70.6846c-.3008-.0977-.5996-.1992-.8945-.3067a2 2 0 0 0-1.3652 3.7598 11.53413 11.53413 0 0 0 1.64252.4502 2.00056 2.00056 0 0 0 .61718-3.9033zM47.34378 25.6045a2.001 2.001 0 0 0-2.8067.3535c-.2187.2842-.4355.5713-.6465.8623a1.99989 1.99989 0 1 0 3.2383 2.3477q.2784-.38385.5684-.7569A1.99975 1.99975 0 0 0 47.34378 25.6045zM77.375 70.6689c-.29692.0967-.59372.1885-.89652.2745a1.99687 1.99687 0 0 0-1.373 2.4716 2.02321 2.02321 0 0 0 2.4707 1.3741q.5244-.1494 1.039-.3174A2 2 0 0 0 77.375 70.6689zM98.46678 35.2959A2.00019 2.00019 0 1 0 94.668 36.5498q.14637.44385.27538.8936a2.02646 2.02646 0 0 0 2.4765 1.3681 1.99928 1.99928 0 0 0 1.3672-2.4756Q98.63768 35.81015 98.46678 35.2959zM69.01168 71.9883c-.3066 0-.6133-.0059-.9179-.0156a2.00007 2.00007 0 1 0-.1309 3.998c.3476.0117 1.0762.0176 1.0762.0176a1.98787 1.98787 0 0 0 1.9863-2A2.01247 2.01247 0 0 0 69.01168 71.9883zM93.65428 60.4082a1.99809 1.99809 0 0 0-2.793.4453c-.1836.2529-.373.5029-.5644.749a1.9995 1.9995 0 0 0 .3398 2.8077 2.01978 2.01978 0 0 0 2.8086-.3409q.33408-.42765.6543-.8681A1.99951 1.99951 0 0 0 93.65428 60.4082zM99.99218 46.0693c-.0029-.3584.0176-1.1953.0176-1.1953a2 2 0 1 0-4 0s-.0039.7432-.0157 1.0567a2.0021 2.0021 0 0 0 1.9297 2.0683A1.85559 1.85559 0 0 0 99.99218 46.0693zM84.89258 66.8271c-.2559.1856-.5117.3663-.7735.543a2.00167 2.00167 0 0 0-.5332 2.7783 2.022 2.022 0 0 0 2.7793.5323q.44535-.3033.8809-.6192a2 2 0 0 0-2.3535-3.2344zM97.21878 52.043a2.001 2.001 0 0 0-2.5196 1.2851c-.0976.2998-.19918.5977-.3066.8916a1.99974 1.99974 0 0 0 3.7578 1.3692q.1875-.50835.3535-1.0264A1.999 1.999 0 0 0 97.21878 52.043zM59.97268 19.4229a5.564 5.564 0 0 0 1.5214-.3731 2 2 0 0 0-1.1074-3.8437q-.5214.15075-1.0351.3183a2.00175 2.00175 0 0 0-1.2813 2.5215A2.0319 2.0319 0 0 0 59.97268 19.4229zM51.91018 23.5586a3.55541 3.55541 0 0 0 1.9472-.9199 2.00031 2.00031 0 0 0-2.2461-3.3106q-.4512.3048-.8867.626a1.99324 1.99324 0 0 0 1.1856 3.6045zM66.96878 15.9893a2.03572 2.03572 0 0 0 2.0429 1.999c.2871 0 .90632.0146.9278.0146a2 2 0 0 0 .06252-3.999c-.33012-.0107-1.07622-.0146-1.07622-.0146A1.96259 1.96259 0 0 0 66.96878 15.9893zM85.56448 23.6572a2.00025 2.00025 0 0 0 2.4531-3.1601c-.2832-.2198-.5723-.4356-.8633-.6465a1.99989 1.99989 0 0 0-2.3477 3.2383C85.06248 23.2744 85.31638 23.4629 85.56448 23.6572zM78.16988 19.5801a2.00018 2.00018 0 0 0 1.3555-3.7637q-.50985-.18315-1.02738-.3496a2 2 0 1 0-1.22262 3.8086Q77.72658 19.42045 78.16988 19.5801z" 
                    />
                    <path 
                      fill="#E5C823"
                      d="M88.01168,42.9883H72.09958a1.99585,1.99585,0,0,0-3.084-1.6787l-3.0918,2a2.00086,2.00086,0,0,0,0,3.3574l3.0918,2a1.99585,1.99585,0,0,0,3.084-1.6787h15.9121a2,2,0,0,0,0-4Z" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Alignment Framework */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Leadership Alignment Challenge
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Most leadership teams struggle with the same fundamental issues that prevent effective transformation.
              </p>
            </div>
            
            {/* Challenge Points */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Purpose Gets Lost
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Quarterly pressures override long-term vision, leaving teams unclear about what truly matters.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Priorities Multiply
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Without focus, everything becomes urgent and important, diluting impact across the organization.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-full transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Departments Silo
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Teams optimize for their own metrics instead of shared outcomes, creating internal competition.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Design4 Solution */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Design4 Leadership Alignment Process
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Transform your leadership team into a unified force for organizational change.
              </p>
            </div>

            {/* Framework Visual */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative">
                <img 
                  src="/design4_logo_color.svg" 
                  alt="Design4 Framework for Leadership Teams" 
                  className="w-full h-auto"
                />
                {/* Leadership annotations */}
                <div className="absolute top-1/4 left-1/4 bg-design4-plum text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Shared Purpose
                </div>
                <div className="absolute top-1/3 right-1/4 bg-design4-gold text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Strategic Focus
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-design4-green text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Aligned Systems
                </div>
              </div>
            </div>

            {/* Leadership Benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Clear Direction
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Everyone knows what success looks like and how their work contributes.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Focused Priorities
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Leadership team says no to good ideas that don't serve the mission.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Cross-Functional Flow
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Departments collaborate naturally toward shared outcomes.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Sustainable Performance
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Results improve consistently without burning out your people.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-plum py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Align Your Leadership Team?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Take our assessment to identify where your leadership alignment needs attention—and get a roadmap for creating the focused, unified team your organization needs.
              </p>
              <Link 
                href="/design4assessment"
                className="inline-block bg-design4-gold text-design4-ink px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-design4-plum"
              >
                Discover where your leadership alignment needs attention
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}