---
layout: page
title: Resume
description: Work experience, education, and professional background
---

<div style="text-align: center; margin-bottom: 3rem;">
  <a href="/resume/Chanzo_Bryan_Resume.pdf" class="btn btn-primary" download>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
      <path d="M8.5 1.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5z"/>
      <path d="M3 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM1 15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v13z"/>
    </svg>
    Download PDF
  </a>
</div>

## About

I'm a Senior Software Engineer at Netflix.

To get a TV show or movie from initial ideation all the way to being live on the service, there's a gargantuan amount of work involved. From securing contracts with talent, script writing, and getting the green light, to filming, post-production, localization, and marketing; there are dozens of domains involved that are large enough to have their own teams and organizations.

The one common thread connecting these distinct domains is the need to broadcast and react to new activity on the titles they are actively working on.

When a script is complete, we want to start localization as fast as possible. When footage has been shot and uploaded, we want to ensure creative workstations are ready for VFX artists. When the footage for a show has gone through post-production, we want to make sure that marketing is aware so that they can use the assets for marketing material.

This happens across multiple projects simultaneously, involving a massive flow of critical information required to streamline the creation of a show or movie.

What I do is provide the infrastructure that underpins this communication, whether that be from system to system, system to person, or person to person. I build the event bus that lets the rest of the business freely send and receive these signals at a scale of billions of events per day, allowing us to audit and react to how the business is evolving.

---

## Experience

<div class="experience-timeline">
  {% for job in site.data.experience %}
  <div class="experience-item">
    <div class="experience-header">
      <h3>{{ job.role }}</h3>
      <div class="company">{{ job.company }}</div>
      <div class="period">{{ job.period }}</div>
      {% if job.location %}
      <div class="location" style="font-size: 0.875rem; color: var(--text-tertiary); margin-top: 0.25rem;">{{ job.location }}</div>
      {% endif %}
    </div>

    {% if job.description %}
    <p class="experience-description">{{ job.description }}</p>
    {% endif %}

    {% if job.highlights %}
    <ul>
      {% for highlight in job.highlights %}
      <li>{{ highlight }}</li>
      {% endfor %}
    </ul>
    {% endif %}

    {% if job.entries %}
    <div style="margin-top: 1rem;">
      {% for entry in job.entries %}
      <div style="margin-bottom: 0.5rem;">
        <strong>{{ entry.role }}</strong> at {{ entry.company }}
        <span style="color: var(--text-tertiary);">({{ entry.period }})</span>
      </div>
      {% endfor %}
    </div>
    {% endif %}

    {% if job.tech %}
    <div class="project-tech" style="margin-top: 1rem;">
      {% for tech in job.tech %}
      <span class="tech-tag">{{ tech }}</span>
      {% endfor %}
    </div>
    {% endif %}
  </div>
  {% endfor %}
</div>

---

## Education

<div class="experience-timeline">
  <div class="experience-item">
    <div class="experience-header">
      <h3>Honours BSc Computer Science</h3>
      <div class="company">University of Toronto</div>
      <div class="period">September 2017 - April 2022</div>
      <div class="location" style="font-size: 0.875rem; color: var(--text-tertiary); margin-top: 0.25rem;">Toronto, Ontario</div>
    </div>
  </div>
</div>

---

<div style="text-align: center; margin-top: 4rem;">
  <h2>Interested in working together?</h2>
  <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
    Let's chat about opportunities and collaborations.
  </p>
  <a href="/contact" class="btn btn-primary">Contact Me</a>
</div>
