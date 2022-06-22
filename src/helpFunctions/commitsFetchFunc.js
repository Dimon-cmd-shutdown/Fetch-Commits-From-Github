const dateParse = require('./dateParseFunc')

const commitsFetchFunc = (data, commitsStorage) => {
    data.forEach((item) => {
        if (item.committer === null) {
            const commitInfoObject = {
                sha: item.sha,
                message: item.commit.message,
                html_url: item.html_url,
                commiter_info: {

                },
                date: dateParse(item.commit.committer.date)
            }
            commitsStorage.push(commitInfoObject)
        }
        else {
            const commitInfoObject = {
                sha: item.sha,
                message: item.commit.message,
                html_url: item.html_url,
                commiter_info: {
                    login: item.committer.login,
                    id: item.committer.id,
                    node_id: item.committer.node_id,
                    html_url: item.committer.html_url,
                    repos_url: item.committer.repos_url,
                    type: item.committer.type,
                },
                date: dateParse(item.commit.committer.date)
            }
            commitsStorage.push(commitInfoObject)
        }

    })
    return commitsStorage
}

module.exports = commitsFetchFunc