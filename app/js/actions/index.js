// 定义action
export const TEST = 'TEST';

export function test(data) {
    return {
        type: TEST,
        payload: data
    }
}
