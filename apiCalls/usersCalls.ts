import { apiClient } from '../helpers';

const rootPath = '/public/v2/users'

export async function createUser(payload:object) {
    return await apiClient.post(rootPath,payload)
}

export async function getUserById(userId:number) {
    return await apiClient.get(rootPath+'/'+userId)
}

export async function updateUser(userId:number,payload:object) {
    return await apiClient.patch(rootPath+'/'+userId,payload)
}

export async function deleteUser(userId:number) {
    return await apiClient.delete(rootPath+'/'+userId)
}