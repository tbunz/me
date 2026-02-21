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
</style>
