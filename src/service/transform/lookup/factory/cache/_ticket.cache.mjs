export class _ticketCache {
    constructor() {
        // ARG-123: <commitsha>
        // dictionary stores latest commit for every ticket, use the ticket id as key
        this.ticketLatestCommit = {}
        this.ticketCommits = {} //stores all commits for every ticket
        this.ticketMentions = {}
        // ARG-123: <merge request #>
        this.ticketLatestMergeRequest = {}
        this.ticketMergeRequests = {}
        //stores all commits mentioned in every ticket
        // <sha>:
        this.commits = {}
        this.mentions = []
        this.tickets = {}

        // TODO: what is this for ?
        this.mapMentionTypeToCache = {
            commit: this.ticketLatestCommit,
            'merge request': this.ticketLatestMergeRequest
        }
    }


    addMention(ticketKey, parsedMention) {
        let {ticket, mentionType, ref} = parsedMention
        // if (mentionType === 'commit') {
        //     this.ticketCommit[ticket] = ref
        // } else if (mentionType === 'merge request') {
        //     this.ticketMergeRequest[ticket] = ref
        // }

        this.mapMentionTypeToCache[mentionType][ticket] = ref


        // nullish assignment of array
        this.ticketMentions[ticket] ??= []
        this.ticketMentions[ticket].push(parsedMention)
        this.mentions.push(parsedMention)
        // this.tickets.add(ticket)
    }

    get cache() {
        return {
            ticketCommit: this.ticketLatestCommit,
            ticketCommits: this.ticketCommits,
            ticketMentions: this.ticketMentions,
            ticketMergeRequest: this.ticketLatestMergeRequest,
            ticketMergeRequests: this.ticketMergeRequests,
            commits: this.commits,
            mentions: this.mentions,
            tickets: this.tickets,
        }
    }

    addTicket(ticket) {
        this.tickets[ticket.key] = ticket
    }
}
