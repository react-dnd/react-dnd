import type { FC } from 'react'

export interface HTMLContentProps {
	html: string
}

export const HTMLContent: FC<HTMLContentProps> = ({ html }) => {
	if (html.length === 0) {
		return <div>Nothing to display</div>
	}

	return <div>{html}</div>
}
