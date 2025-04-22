import { apiClient } from '../helpers';

const rootPath = '/public/v2/posts'

export async function createPost(payload:object) {
    return await apiClient.post(rootPath,payload)
}