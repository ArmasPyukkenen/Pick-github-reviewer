export const PER_PAGE = 20;

export const searchUser = (login: string) => {
  return fetch(`https://api.github.com/users/${login}`)
}
export const searchRepo = (repoFullName: string) => {
  return fetch(`https://api.github.com/search/repositories?q=${repoFullName}`)
}
//Let's just ignore pagination for now))
export const getRepoContributors = (repoFullName: string, page=1) => {
  return fetch(`https://api.github.com/repos/${repoFullName}/contributors?per_page=${PER_PAGE}&page=${page}`)
}