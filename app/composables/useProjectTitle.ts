export function useProjectTitle() {
  // Desktop/default nav title (tagline || title) and the optional shorter
  // mobile variant. Both are set atomically; the persistent nav — which knows
  // the breakpoint reliably — picks which to show, so there's no post-mount swap.
  const projectTitle = useState<string | null>('projectTitle', () => null)
  const projectTitleMobile = useState<string | null>('projectTitleMobile', () => null)

  function setProjectTitle(title: string, mobileTitle?: string | null) {
    projectTitle.value = title
    projectTitleMobile.value = mobileTitle ?? null
  }

  function clearProjectTitle() {
    projectTitle.value = null
    projectTitleMobile.value = null
  }

  return { projectTitle, projectTitleMobile, setProjectTitle, clearProjectTitle }
}
