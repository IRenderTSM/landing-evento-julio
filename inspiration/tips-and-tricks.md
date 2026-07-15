# Julio-iero

1. Creando el repo
    
    ```jsx
    git --version      # if missing: brew install git  (Mac) or apt install git
    gh --version       # GitHub CLI — optional but makes step 4 one command
    ```
    

**Step 1 — Create the `.gitignore` FIRST.** In your project folder, before anything else:

(esto va a hacer que no tenga que subir los recursos privados de la empresa)

bash

`cd /ruta/a/tu/proyecto-julio

cat > .gitignore << 'EOF'
# Secrets — NUNCA subir
.env
.env.local
*.key
config.secret.*

# Dependencias
node_modules/

# Build / sistema
dist/
.DS_Store
*.log
EOF`

If you have Stripe keys anywhere, put them in a `.env` file (now ignored), never hardcoded in your code.

**Step 2 — Initialize git and make the first commit:**

bash

`git init
git add .
git commit -m "Initial commit: landing page evento Julio"`

**Step 3 — Create a README** (this is what turns a repo into a *portfolio* piece — code alone isn't enough):

bash

`cat > README.md << 'EOF'
# Landing Page — Evento Julio Iero

Página de evento responsiva con animaciones, desarrollada como
proyecto freelance para un coach de ventas/marketing.

## Stack
- HTML / CSS / JS (o React, ajusta según uses)
- GSAP para animaciones
- Desplegado en Vercel / julioiero.com

## Características
- Diseño mobile-first
- Animaciones de scroll
- Optimizado para conversión

[Ver demo en vivo](https://...)
EOF

git add README.md
git commit -m "Add README"`

**Step 4 — Create the GitHub repo and push.** Easiest with the GitHub CLI:

bash

`gh repo create landing-evento-julio --public --source=. --remote=origin --push`

If you don't have `gh`, do it manually: go to github.com → New repository → name it → **don't** initialize with a README (you already have one) → create, then run the commands GitHub shows you, which will look like:

bash

`git remote add origin https://github.com/TU-USUARIO/landing-evento-julio.git
git branch -M main
git push -u origin main`

That's it — your code is live on GitHub.

**From here, your daily rhythm is:**

bash

`git add .
git commit -m "describe qué cambiaste"
git push`

Commit often with clear messages — a repo with 40 thoughtful commits over two weeks looks far more like real work than one giant "final" commit, and recruiters/clients do look at commit history.

**Three portfolio-specific tips while it's fresh:**

A live demo link in the README is what actually impresses people — they're not going to clone and run your code. Once you deploy (Vercel/Netlify gives you a free URL instantly), paste that link at the top.

If you'd rather keep it private until Julio's event launches, use `--private` instead of `--public` in step 4, then flip it to public later from the repo settings. You don't lose anything by starting private.

Consider a screenshot or short GIF of the finished page embedded in the README. It's the difference between a repo someone skims and one they remember.

One decision before you run step 4: **public or private to start?** Given the event hasn't happened yet (July 28–30) and Julio's a real client with a big audience, I'd lean **private until the page is live**, then flip to public as a portfolio piece once it's launched and he's okay with it. Want me to sketch the deploy step (Vercel) so you've got the live-demo link ready to drop in the README?

## Tell Claude Code

### Before writing code

> Brainstorm ideas, make a plan, run it by me, ask for approval, before you write code
> 

### When a change is ready

> commit, push, pr
> 

### About bash tools

> Use the barley CLI to check for error logs in the last training run. Use -h to check how to use it.
> 

## Common workflows

1. **Explore → Plan → confirm → code → commit**
    
    “Figure out the root cause for issue #983, then propose a few fixes. Let me choose an approach before you code. ultrathink.”
    
2. **Write tests → Commit → Code → Iterate → Commit**
    
    Write tests for outils/markdown.ts to make sure links render properly (note the tests won’t pass yet, since links aren’t yet implemented). Then commit. Then update the code to make the tests pass.
    
3. **Write code → Screenshot result → Iterate**
    
    Implement (mock img). Then screenshot it with Puppeteer and iterate till it looks like the mock.
    

## Keybindings

![Screenshot 2026-05-28 at 6.19.24 a.m..png](Julio-iero/Screenshot_2026-05-28_at_6.19.24_a.m..png)

## Models

**Opus:** Planning and handling ambiguous tasks

**Sonnet:** Ships tasks quickly

## claude.md & prompt.md

- **claude.md:** Is basically a file with the rules and things to take into account when Claude is working on my project
- **prompt.md:** to have a reusable prompt that I can apply into my claude conversation through @prompt.md, that will make claude remember the context of the prompt
    
    *I could tell claude he’s a very creative designer…
    

## Thinking

- **THINK:** Fix a typo, change a color.
- **THINK HARD:** Rewrite a function.
- **ULTRATHINK:** Refactor the authentication system.

Ultrathink + Plan Mode = Very powerful

## Prompt ideas

https://kie.ai/nano-banana-2

> A professional studio-grade image of a _____. It should be against a plain all-black background with no shadows, no hands, no reflections.
> 

---

**Claude:**

> Help me create an Al video prompt where I have the first image as a start frame and the second image as the end frame. What I want to happen in the video is for the lid to float off, for the fruit and juice to be dropped in and poured in, and then the lid goes back on. It should be very smooth animations; it should be cinematic. There should be no hands, no shadows, no reflections.
It should just look as if it is magic.
> 

---

… put that into **Kling** → download the video → **Claude Code**:

> Help me create a one-page product landing page for this product. It should be modern, feel very professional, have smooth animations and design throughout. All of the text should be easy to read, and the background of the website should be completely black. It should be a dark mode and it should blend into the background of the _____________ Kling image so that it looks like it is one fluid webpage. You could install and use FFMPEG
> 

## Skills

[Classroom · AI Automation Society](https://www.skool.com/ai-automation-society/classroom)

“Hey, set up this folder. I’ve got my .claude, I’ve got a skills folder, and withing my skills folder, here are my two skills I need you to use.”

## Inspo

[Best Animation Websites | Web Design Inspiration](https://www.awwwards.com/websites/animation/)