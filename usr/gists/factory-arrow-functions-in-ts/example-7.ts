type FAF<TArgs, TReturn> = TArgs extends any[]
	? (...args: TArgs) => TReturn
	: (arg: TArgs) => TReturn
