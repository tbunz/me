<template>
  <div class="gallery">
    <h1>Design Primitives</h1>

    <section>
      <h2>Backgrounds</h2>
      <div class="swatches">
        <div class="swatch" style="background: #FAFAF7; border: 1px solid #D4C4A8;">
          <span class="swatch-label">$bg-base</span>
          <span class="swatch-hex">#FAFAF7</span>
        </div>
        <div class="swatch" style="background: #F5F0EB;">
          <span class="swatch-label">$bg-surface</span>
          <span class="swatch-hex">#F5F0EB</span>
        </div>
        <div class="swatch swatch--dark" style="background: #2A2118;">
          <span class="swatch-label">$bg-dark</span>
          <span class="swatch-hex">#2A2118</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Text</h2>
      <div class="swatches">
        <div class="swatch swatch--dark" style="background: #1C1410;">
          <span class="swatch-label">$text-primary</span>
          <span class="swatch-hex">#1C1410</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Browns</h2>
      <div class="swatches">
        <div class="swatch swatch--dark" style="background: #8B6F4E;">
          <span class="swatch-label">$brown</span>
          <span class="swatch-hex">#8B6F4E</span>
        </div>
        <div class="swatch swatch--dark" style="background: #6B5340;">
          <span class="swatch-label">$brown-dark</span>
          <span class="swatch-hex">#6B5340</span>
        </div>
        <div class="swatch swatch--dark" style="background: #A68B6B;">
          <span class="swatch-label">$brown-light</span>
          <span class="swatch-hex">#A68B6B</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Tans</h2>
      <div class="swatches">
        <div class="swatch" style="background: #D4C4A8;">
          <span class="swatch-label">$tan</span>
          <span class="swatch-hex">#D4C4A8</span>
        </div>
        <div class="swatch" style="background: #E8DFD0;">
          <span class="swatch-label">$tan-light</span>
          <span class="swatch-hex">#E8DFD0</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Utility</h2>
      <div class="swatches">
        <div class="swatch swatch--dark" style="background: #C9785C;">
          <span class="swatch-label">$terracotta</span>
          <span class="swatch-hex">#C9785C</span>
        </div>
        <div class="swatch swatch--dark" style="background: #5A7A64;">
          <span class="swatch-label">$sage</span>
          <span class="swatch-hex">#5A7A64</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Typography</h2>
      <div class="type-samples">
        <div class="type-sample">
          <span class="type-label">H1 — 48px / 700 / -0.02em</span>
          <h1 class="sample-h1">Call me Ishmael.</h1>
        </div>
        <div class="type-sample">
          <span class="type-label">H2 — 32px / 700 / -0.01em</span>
          <h2 class="sample-h2">So we beat on, boats against the current.</h2>
        </div>
        <div class="type-sample">
          <span class="type-label">H3 — 20px / 500</span>
          <h3 class="sample-h3">All happy families are alike; each unhappy family is unhappy in its own way.</h3>
        </div>
        <div class="type-sample">
          <span class="type-label">Body — 16px / 400 / 1.6 line-height</span>
          <p class="sample-body">It was a bright cold day in April, and the clocks were striking thirteen.</p>
        </div>
        <div class="type-sample">
          <span class="type-label">Caption — 14px / 400</span>
          <p class="sample-caption">It was the best of times, it was the worst of times.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.gallery {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 40px;
  background: $bg-base;
  color: $text-primary;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: $brown-dark;
  margin-bottom: 48px;
}

h2 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $brown-light;
  margin-bottom: 16px;
}

section {
  margin-bottom: 40px;
}

.swatches {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.swatch {
  width: 160px;
  height: 100px;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: $text-primary;

  &--dark {
    color: $bg-base;
  }
}

.swatch-label {
  font-size: 0.8rem;
  font-weight: 600;
  font-family: monospace;
}

.swatch-hex {
  font-size: 0.7rem;
  font-family: monospace;
  opacity: 0.7;
}

.type-samples {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.type-sample {
  border-bottom: 1px solid $tan-light;
  padding-bottom: 32px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.type-label {
  display: block;
  font-size: 0.7rem;
  font-family: monospace;
  color: $brown-light;
  margin-bottom: 8px;
}

.sample-h1 { @include type-h1; color: $text-primary; margin: 0; }
.sample-h2 { @include type-h2; color: $text-primary; margin: 0; text-transform: none; letter-spacing: $tracking-snug; }
.sample-h3 { @include type-h3; color: $text-primary; margin: 0; }
.sample-body { @include type-body; color: $text-primary; margin: 0; }
.sample-caption { @include type-caption; color: $text-secondary; margin: 0; }
</style>
