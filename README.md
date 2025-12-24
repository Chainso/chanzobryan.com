# chanzobryan.com

Personal website for Chanzo Bryan - Senior Software Engineer at Netflix.

## About

This is my personal website showcasing my work, projects, and writing. Built with Jekyll and hosted on GitHub Pages.

**Important**: Personal projects featured on this site are built in my spare time and are completely separate from my professional work at Netflix/Celestica.

## Tech Stack

- **Static Site Generator**: Jekyll 4.x
- **Hosting**: GitHub Pages
- **Styling**: SCSS with CSS custom properties for theming
- **Features**: Dark/light mode, responsive design, contact form (Web3Forms)

## Development

### Prerequisites

- Ruby 3.2+
- Bundler

### Setup

```bash
# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

The site will be available at `http://localhost:4000`

### Project Structure

```
.
├── _data/              # Data files (projects, skills, experience)
├── _includes/          # Reusable components
├── _layouts/           # Page layouts
├── _posts/             # Blog posts (feature-flagged)
├── _site/              # Generated site (git-ignored)
├── assets/
│   ├── css/           # SCSS stylesheets
│   └── js/            # JavaScript files
├── resume/            # Resume files (PDF, LaTeX source)
├── _config.yml        # Jekyll configuration
└── pages/             # Static pages (about, projects, etc.)
```

## Features

### Dark/Light Theme

Theme preference is saved to localStorage and respects system preferences.

### Contact Form

Uses Web3Forms for form handling (250 free submissions/month). Update the access key in `_config.yml`.

### Feature Flags

Configure features in `_config.yml`:
- `blog_enabled`: Toggle blog visibility
- `analytics_enabled`: Toggle analytics
- `contact_form_enabled`: Toggle contact form

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch via GitHub Actions.

### Custom Domain Setup

1. Add your domain to your DNS provider:
   - A record pointing to GitHub Pages IPs
   - Or CNAME record pointing to `<username>.github.io`
2. Enable custom domain in repository settings
3. Enable "Enforce HTTPS"

## Web3Forms Setup

1. Visit [web3forms.com](https://web3forms.com)
2. Create an account (free)
3. Get your access key
4. Update `_config.yml`:
   ```yaml
   web3forms:
     access_key: "YOUR_ACCESS_KEY"
   ```

## License

The code is available under the MIT License. Content and projects are © Chanzo Bryan.
