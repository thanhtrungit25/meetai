type Props = {
  children: React.ReactNode;
}

export default function MeetingCallLayout({ children }: Props) {
  return (
    <div className="h-screen bg-black">
      {children}
    </div>
  );
};