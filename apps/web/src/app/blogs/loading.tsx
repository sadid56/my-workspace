import { Container } from "@repo/shared"
import { BlogCardHorizontalSkeleton } from "./_components/BlogCardHorizentalSkeketon"

const Loading = () => {
    return (
        <Container className="space-y-3">
            <BlogCardHorizontalSkeleton />
            <BlogCardHorizontalSkeleton />
            <BlogCardHorizontalSkeleton />
        </Container>
    )
}

export default Loading