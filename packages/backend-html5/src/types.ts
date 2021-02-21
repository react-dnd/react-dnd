export type HTML5BackendContext = Window | undefined

/**
 * Configuration options for the HTML5Backend
 */
export interface HTML5BackendOptions {
	/**
	 * Unblocks processing of drag events for native types (e.g. files, etc..).
	 * This may cause unexpected behavior in systems where these events are not
	 * captured and handled by applications.
	 */
	unblockNativeTypeEvents?: boolean
}
