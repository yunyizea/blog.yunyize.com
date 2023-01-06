interface BlogsData extends Object {
    date: string
    hasImage: boolean
    id: string
    imageURL: string | null
    introduction: string
    lastChange: string
    target: string
    title: string
}

interface NetworkRequestParameter {
    callbackFn: NetworkRequestCallbackFn
    data?: Object | any
    method?: string
    timeout?: number
    synchronize?: boolean
    user?: string
    password?: string
    header?: Object | any
}

interface NetworkRequestCallbackFn {
    anyway?: Function
    failed?: Function
    success: Function
}

interface ClientInformation {
    width: number
    height: number
}