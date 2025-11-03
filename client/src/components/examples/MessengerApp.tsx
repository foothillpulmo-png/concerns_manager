import MessengerApp from '../MessengerApp';

export default function MessengerAppExample() {
  return (
    <MessengerApp
      currentUser={{
        name: "Dr. Emily Chen",
        initials: "EC",
        isAdmin: true,
      }}
      onLogout={() => console.log('Logout clicked')}
      onAdminClick={() => console.log('Admin panel clicked')}
    />
  );
}
