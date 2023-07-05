import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default function instantiatePusher() {
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
    // auth: {
    //   headers: {
    //     withCredentials: true
    //   }
    // }
  })
  console.log('Pusher installed')
  return true
}
