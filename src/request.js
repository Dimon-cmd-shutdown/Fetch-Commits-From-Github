const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
    auth: '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'
})

const octokitSet = async () => {
    const response = await octokit.request('GET /repos/Dimon-cmd-shutdown/chat-app/commits', {
        owner: 'Dimon-cmd-shutdown',
        repo: 'chat-app'
    })
    return response
}

octokitSet().then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.log('ERROR!')
})



