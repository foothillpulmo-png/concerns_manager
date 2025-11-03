import ThreadHeader from '../ThreadHeader';

export default function ThreadHeaderExample() {
  return (
    <ThreadHeader
      patientName="John Smith"
      patientInfo="DOB: 05/12/1978 | ID: PT-12345"
      currentStatus="urgent"
      onStatusChange={(status) => console.log('New status:', status)}
    />
  );
}
