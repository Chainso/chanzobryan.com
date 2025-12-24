---
layout: page
title: Projects
description: Personal side projects exploring AI, game development, and distributed systems
---

<div class="projects-intro">
  <p style="text-align: center; font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 3rem;">
    These are personal projects I've built on my own time, exploring AI, game development, and various technologies.
  </p>
</div>

## Featured Projects

<div class="grid grid-2">
  {% for project in site.data.projects.featured %}
    {% include project-card.html project=project type="featured" %}
  {% endfor %}
</div>

---

<div style="text-align: center; margin-top: 3rem;">
  <h2>Want to collaborate?</h2>
  <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
    I'm always interested in open source contributions and interesting projects.
  </p>
  <a href="/contact" class="btn btn-primary">Get in Touch</a>
</div>
