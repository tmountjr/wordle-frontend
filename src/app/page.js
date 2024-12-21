import Board from '@/components/Board'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="grid grid-rows-[20px_1fr_20px] sm:items-center justify-items-center min-h-screen p-6 pb-10 gap-4 sm:gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center w-full sm:w-1/3">
            <Board />
          </main>
        </div>
        <div className="fixed bottom-0 left-0 p-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <p>&copy; {new Date().getFullYear()} Tom Mount. All rights reserved.</p>
            <a href="https://github.com/tmountjr/wordle-frontend" target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
