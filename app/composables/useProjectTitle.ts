export function useProjectTitle() {
  const projectTitle = useState<string | null>('projectTitle', () => null)

  function setProjectTitle(title: string) {
    projectTitle.value = title
  }

  function clearProjectTitle() {
    projectTitle.value = null
  }

  return { projectTitle, setProjectTitle, clearProjectTitle }
}
