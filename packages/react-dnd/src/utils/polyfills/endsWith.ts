if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search: string, thisLen: number) {
		if (thisLen === undefined || thisLen > this.length) {
			thisLen = this.length
		}
		return this.substring(thisLen - search.length, thisLen) === search
	}
}
