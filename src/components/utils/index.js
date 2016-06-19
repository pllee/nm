function buildErrorClass(hasError, defaultClass) {
	return defaultClass + (hasError ? ' hint--right hint--error hint--always' : '');
}

export {buildErrorClass};
