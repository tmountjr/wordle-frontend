import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 p-4 text-gray-600 dark:text-gray-400 bg-gray-200 border-t border-gray-700 dark:border-gray-300">
      <div className="flex items-center space-x-2">
        <p>&copy; {new Date().getFullYear()} Tom Mount. All rights reserved.</p>
        <a href="https://github.com/tmountjr/wordle-frontend" target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  )
}