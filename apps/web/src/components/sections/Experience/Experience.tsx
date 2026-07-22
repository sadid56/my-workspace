import Container from "@/components/global/Container";
import { Timeline } from "@/components/sections/TimeLine/TimeLIne";
import EXPERIENCE from "@/data/experience";

const Experience = () => {
  return (
    <Container id='experience' className='relative pb-10 md:pb-48'>
      <Timeline data={EXPERIENCE} />
    </Container>
  );
};

export default Experience;
