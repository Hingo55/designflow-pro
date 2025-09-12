-- Blog posts table for Design4Biz
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Design4 Team',
  author_email TEXT,
  category TEXT NOT NULL DEFAULT 'Strategy',
  featured_image_url TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample blog posts (migrating from existing mock data)
INSERT INTO blog_posts (
  title, slug, excerpt, content, author, category, 
  read_time_minutes, published_at, status, featured, seo_title, seo_description
) VALUES 
(
  'The Four Phases of Business Transformation: A Design4 Perspective',
  'four-phases-business-transformation',
  'Understanding how the Discover, Define, Develop, and Deliver phases create sustainable competitive advantage through systematic organizational alignment.',
  '<p>In today''s rapidly evolving business landscape, organizations face an unprecedented challenge: how to build sustainable competitive advantage while remaining agile enough to respond to constant change. The Design4 framework offers a systematic approach through four interconnected phases that align organizational purpose with operational execution.</p>
  
  <h2>The Challenge of Modern Business Transformation</h2>
  <p>Most transformation initiatives fail not because of poor strategy, but because of misalignment between different organizational layers. Companies often excel at creating compelling visions but struggle to translate these into coherent capabilities and daily operations.</p>
  
  <blockquote>"The gap between strategic intent and operational reality is where most transformations die. Design4 bridges this gap by creating systematic alignment across all four phases." - Omar Choudhry</blockquote>
  
  <h2>Phase 1: Discover - Understanding Your Purpose</h2>
  <p>The Discover phase focuses on uncovering your organization''s true purpose and understanding the market context in which you operate. This isn''t about creating mission statements, but about identifying the fundamental value you create for stakeholders.</p>
  
  <h3>Key Activities in the Discover Phase:</h3>
  <ul>
    <li>Stakeholder value mapping</li>
    <li>Market context analysis</li>
    <li>Purpose articulation workshops</li>
    <li>Value creation assessment</li>
  </ul>
  
  <h2>Phase 2: Define - Crafting Your Strategy</h2>
  <p>Define translates your purpose into actionable strategic direction. This phase creates the bridge between why you exist and how you''ll compete in the marketplace.</p>
  
  <p>Strategic definition in Design4 goes beyond traditional planning. It creates dynamic frameworks that can adapt to changing conditions while maintaining strategic coherence.</p>
  
  <h2>Phase 3: Develop - Building Capabilities</h2>
  <p>The Develop phase focuses on building the organizational capabilities required to execute your strategy effectively. This includes not just skills and processes, but the entire ecosystem of capabilities needed for success.</p>
  
  <h2>Phase 4: Deliver - Executing with Excellence</h2>
  <p>Deliver ensures that daily operations consistently produce the outcomes defined in your strategy. This phase creates the feedback loops and measurement systems that enable continuous improvement.</p>
  
  <h2>The Integration Challenge</h2>
  <p>The power of Design4 lies not in any individual phase, but in how these phases integrate and reinforce each other. Each phase informs and strengthens the others, creating a virtuous cycle of alignment and improvement.</p>
  
  <table>
    <thead>
      <tr>
        <th>Phase</th>
        <th>Focus</th>
        <th>Key Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Discover</td>
        <td>Purpose & Context</td>
        <td>Clear value proposition</td>
      </tr>
      <tr>
        <td>Define</td>
        <td>Strategic Direction</td>
        <td>Actionable strategy</td>
      </tr>
      <tr>
        <td>Develop</td>
        <td>Capabilities</td>
        <td>Execution readiness</td>
      </tr>
      <tr>
        <td>Deliver</td>
        <td>Operations</td>
        <td>Sustainable results</td>
      </tr>
    </tbody>
  </table>
  
  <h2>Implementing the Four Phases</h2>
  <p>Successful implementation of the Design4 framework requires commitment to systematic thinking and continuous iteration. Organizations that embrace this approach consistently outperform those that rely on traditional planning methods.</p>
  
  <p>The journey through these four phases isn''t linear - it''s iterative and dynamic, allowing organizations to continuously refine their approach based on learning and changing market conditions.</p>',
  'Omar Choudhry',
  'Strategy',
  8,
  '2024-03-15T00:00:00Z',
  'published',
  true,
  'The Four Phases of Business Transformation: A Design4 Perspective',
  'Learn how the Discover, Define, Develop, and Deliver phases create sustainable competitive advantage through systematic organizational alignment with the Design4 framework.'
),
(
  'Why Most Strategic Plans Fail: The Alignment Gap',
  'strategic-plans-alignment-gap',
  'Exploring the disconnect between strategy formulation and execution, and how Design4 bridges this critical gap.',
  '<p>Research shows that 67% of well-formulated strategies fail due to poor execution. The problem isn''t strategy creation - it''s the alignment gap between strategic intent and organizational reality.</p>
  
  <h2>The Anatomy of Strategic Failure</h2>
  <p>Most strategic plans fail at three critical junctions: the translation from vision to actionable plans, the development of necessary capabilities, and the alignment of daily operations with strategic objectives.</p>
  
  <blockquote>"Strategy without alignment is just expensive wishful thinking." - Design4 Framework</blockquote>
  
  <h2>Common Alignment Gaps</h2>
  <ul>
    <li><strong>Purpose-Strategy Gap:</strong> Strategic plans that don''t reflect organizational purpose</li>
    <li><strong>Strategy-Capability Gap:</strong> Strategies that ignore current organizational capabilities</li>
    <li><strong>Capability-Operations Gap:</strong> Operations that don''t leverage organizational strengths</li>
  </ul>
  
  <h2>The Design4 Solution</h2>
  <p>The Design4 framework addresses these gaps through systematic integration across all four phases. By ensuring each phase builds on and reinforces the others, organizations create sustainable alignment.</p>
  
  <h3>Bridging the Gaps:</h3>
  <p><strong>Discover-Define Integration:</strong> Purpose discovery directly informs strategic choices, ensuring strategies reflect organizational identity.</p>
  <p><strong>Define-Develop Integration:</strong> Strategic direction drives capability development, ensuring resources focus on what matters most.</p>
  <p><strong>Develop-Deliver Integration:</strong> Capabilities enable operational excellence, ensuring daily work produces strategic outcomes.</p>
  
  <h2>Practical Steps to Close Alignment Gaps</h2>
  <ol>
    <li>Conduct regular alignment audits across all four phases</li>
    <li>Create cross-functional teams that span multiple phases</li>
    <li>Implement feedback loops between operations and strategy</li>
    <li>Measure alignment metrics, not just performance metrics</li>
  </ol>
  
  <p>Organizations that master this integration consistently outperform their peers and adapt more quickly to market changes.</p>',
  'Design4 Team',
  'Leadership',
  6,
  '2024-03-10T00:00:00Z',
  'published',
  false,
  'Why Most Strategic Plans Fail: The Alignment Gap',
  'Discover why 67% of strategic plans fail and how the Design4 framework bridges the critical alignment gap between strategy and execution.'
),
(
  'Building Capabilities That Matter: From Intent to Impact',
  'building-capabilities-that-matter',
  'A practical guide to developing organizational capabilities that directly support strategic objectives.',
  '<p>Many organizations invest heavily in capability development but see little strategic impact. The problem isn''t the investment - it''s the lack of strategic alignment in capability selection and development.</p>
  
  <h2>The Capability Challenge</h2>
  <p>Traditional approaches to capability development often focus on generic "best practices" rather than strategically relevant capabilities. This leads to organizations that are good at everything but excel at nothing that matters strategically.</p>
  
  <h2>Design4 Approach to Capability Development</h2>
  <p>The Design4 framework takes a different approach: capabilities are developed specifically to enable strategic success, not as generic organizational improvements.</p>
  
  <h3>Strategic Capability Mapping</h3>
  <p>Before developing any capability, Design4 requires organizations to map how that capability directly contributes to strategic objectives and stakeholder value creation.</p>
  
  <blockquote>"Every capability investment should have a clear line of sight to strategic outcomes and stakeholder success." - Design4 Principle</blockquote>
  
  <h2>The Capability Development Process</h2>
  <ol>
    <li><strong>Identify Strategic Requirements:</strong> What capabilities are required to execute your strategy?</li>
    <li><strong>Assess Current State:</strong> Where do you have strengths and gaps?</li>
    <li><strong>Prioritize Development:</strong> Which capabilities provide the highest strategic leverage?</li>
    <li><strong>Design Development Paths:</strong> How will you build these capabilities?</li>
    <li><strong>Implement and Measure:</strong> Track capability development and strategic impact</li>
  </ol>
  
  <h2>Types of Strategic Capabilities</h2>
  <p>Design4 identifies three types of capabilities that organizations need to develop:</p>
  
  <h3>Core Capabilities</h3>
  <p>Fundamental skills and processes that enable basic strategic execution. These are table stakes for competitive participation.</p>
  
  <h3>Differentiating Capabilities</h3>
  <p>Unique strengths that create competitive advantage. These capabilities are hard for competitors to replicate and directly support strategic positioning.</p>
  
  <h3>Adaptive Capabilities</h3>
  <p>Meta-capabilities that enable continuous learning and adaptation. These allow organizations to develop new capabilities as strategic requirements evolve.</p>
  
  <h2>Measuring Capability Impact</h2>
  <p>Traditional capability assessments focus on maturity levels. Design4 measures capability impact through strategic contribution and stakeholder value creation.</p>
  
  <table>
    <thead>
      <tr>
        <th>Capability Type</th>
        <th>Measurement Focus</th>
        <th>Success Indicators</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Core</td>
        <td>Efficiency & Quality</td>
        <td>Cost reduction, error rates</td>
      </tr>
      <tr>
        <td>Differentiating</td>
        <td>Competitive Advantage</td>
        <td>Market share, customer preference</td>
      </tr>
      <tr>
        <td>Adaptive</td>
        <td>Learning & Evolution</td>
        <td>Innovation rate, adaptation speed</td>
      </tr>
    </tbody>
  </table>
  
  <h2>Common Capability Development Mistakes</h2>
  <ul>
    <li>Developing capabilities without strategic context</li>
    <li>Focusing on individual skills rather than organizational capabilities</li>
    <li>Measuring capability maturity instead of strategic impact</li>
    <li>Treating capability development as a one-time project</li>
  </ul>
  
  <p>Organizations that align capability development with strategic requirements create sustainable competitive advantage and adapt more effectively to changing market conditions.</p>',
  'Omar Choudhry',
  'Capabilities',
  7,
  '2024-03-05T00:00:00Z',
  'published',
  false,
  'Building Capabilities That Matter: From Intent to Impact',
  'Learn how to develop organizational capabilities that directly support strategic objectives with the Design4 framework approach.'
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Create policy for authenticated users to manage posts (optional)
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');
