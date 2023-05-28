import LoginAnchorButton from './components/LoginAnchorButton'
import LoginAnimation from './components/LoginAnimation'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <LoginAnchorButton/>
      <LoginAnimation/>
    </main>
  )
}
