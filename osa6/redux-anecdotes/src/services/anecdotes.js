const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }
  
  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const voteNew = async (id) => {
  const allAnecdotes = await fetch(baseUrl)
  const allInJson = await allAnecdotes.json()
  const votedAnecdote = allInJson.filter(one => one.id===id)[0]

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, content: votedAnecdote.content, votes: votedAnecdote.votes+1 }),
  }
  
  const response = await fetch(`${baseUrl}/${id}`, options)
  
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  
  return await response.json()
}

export default { getAll, createNew, voteNew }