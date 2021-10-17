
export class _ticketCache {
    // use a closure to initialize the caches below
    constructor() {
        // ARG-123: <commitsha>
        //stores latest commit for every ticket, use the ticket id as key,
        this.ticketCommit = {}
        this.ticketCommits = {} //stores all commits for every ticket
        this.ticketMentions = {}
        // ARG-123: <merge request #>
        this.ticketMergeRequest = {}
        this.ticketMergeRequests = {}
        //stores all commits mentioned in every ticket
        // <sha>:
        this.commits = {}
        this.mentions = []
        this.tickets = new Set()

        this.mentionTypeMap = {
            commit: this.ticketCommit,
            'merge request': this.ticketMergeRequest
        }
    }


    update(ticketKey, parsedMention) {
        let {ticket, mentionType, ref} = parsedMention
        // if (mentionType === 'commit') {
        //     this.ticketCommit[ticket] = ref
        // } else if (mentionType === 'merge request') {
        //     this.ticketMergeRequest[ticket] = ref
        // }

        this.mentionTypeMap[mentionType][ticket] = ref


        // nullish assignment of array
        this.ticketMentions[ticket] ??= []
        this.ticketMentions[ticket].push(parsedMention)
        this.mentions.push(parsedMention)
        this.tickets.add(ticket)
    }

    get cache() {
        return {
            ticketCommit: this.ticketCommit,
            ticketCommits: this.ticketCommits,
            ticketMentions: this.ticketMentions,
            ticketMergeRequest: this.ticketMergeRequest,
            ticketMergeRequests: this.ticketMergeRequests,
            commits: this.commits,
            mentions: this.mentions,
        }
    }
}
