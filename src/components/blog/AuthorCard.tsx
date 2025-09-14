interface AuthorCardProps {
  name: string
  email?: string | null
  bio?: string
  avatar?: string
  social?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export function AuthorCard({ name, email, bio, avatar, social }: AuthorCardProps) {
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-design4-primary/5 to-design4-gold/5 rounded-xl border border-design4-neutral-100">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 bg-design4-primary/20 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-design4-primary font-semibold text-xl">
                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-design4-ink text-lg">{name}</h4>
            <span className="text-design4-neutral-400">•</span>
            <span className="text-design4-neutral-500 text-sm">Author</span>
          </div>
          
          {bio && (
            <p className="text-design4-neutral-700 mb-4 leading-relaxed">
              {bio}
            </p>
          )}
          
          {/* Social Links */}
          {social && (Object.values(social).some(link => link)) && (
            <div className="flex items-center gap-4">
              {social.website && (
                <a 
                  href={social.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-design4-neutral-500 hover:text-design4-primary transition-colors"
                  aria-label="Visit website"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </a>
              )}
              
              {social.linkedin && (
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-design4-neutral-500 hover:text-design4-primary transition-colors"
                  aria-label="Connect on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              
              {social.twitter && (
                <a 
                  href={social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-design4-neutral-500 hover:text-design4-primary transition-colors"
                  aria-label="Follow on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}