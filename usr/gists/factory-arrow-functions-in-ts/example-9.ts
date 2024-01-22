type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn

const str: FAF<[string[]], string> = (strs: string[]) => ""
