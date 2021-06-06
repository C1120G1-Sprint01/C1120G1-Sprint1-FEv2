import { Post } from "./Post";

export interface PostDTO {
    post: Post,
    images: Array<string>
}