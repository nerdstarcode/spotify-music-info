import LoginAnchorButton from '@atoms/LoginAnchorButton'
import LoginAnimation from '@atoms/LoginAnimation'
export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-around p-24">
      <LoginAnchorButton/>
      <LoginAnimation/>
    </section>
  )
}
