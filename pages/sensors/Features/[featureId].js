
// import { notFound } from 'next/navigation';
// import { Feature2Content, Feature3Content, Feature4Content,Feature1Content } from '@/components/IotModule';
// import {IoTModuleLayout} from '@/components/IotModule';
// import Footer from '@/components/Footer';
// const features = {
//   '1': Feature1Content,
//   '2': Feature2Content,
//   '3': Feature3Content,
//   '4': Feature4Content,
// };



// export default async function Page({ params }) {
//   // Get the appropriate component based on the featureId
//   // const featureId=params;
//   const resolvedParams = await params;
//   const Feature = features[resolvedParams.featureId];

//   // If no matching feature is found, show 404
//   if (!Feature) {
//     notFound();
//   }

//   return (
//     <div>
//     <IoTModuleLayout currentFeatureId={resolvedParams.featureId}>
//       <Feature />
//     </IoTModuleLayout>
//      <Footer />
//     </div>
//   );
// }
import { notFound } from 'next/navigation';
import {Feature3Content, Feature4Content, Feature1Content } from '@/components/IotModule';
import { Feature2Content } from '@/components/IotModule';
import { IoTModuleLayout } from '@/components/IotModule';
import Footer from '@/components/Footer';

const features = {
  '1': Feature1Content,
  '2': Feature2Content,
  '3': Feature3Content,
  '4': Feature4Content,
};

export async function getStaticPaths() {
  // Define which paths will be pre-rendered
  return {
    paths: [
      { params: { featureId: '1' } },
      { params: { featureId: '2' } },
      { params: { featureId: '3' } },
      { params: { featureId: '4' } },
    ],
    fallback: false // Show 404 for any paths not defined above
  };
}

export async function getStaticProps({ params }) {
  // Pass the featureId as a prop to the page
  return {
    props: {
      featureId: params.featureId
    }
  };
}

// The page component now receives featureId as a prop
export default function Page({ featureId }) {
  const Feature = features[featureId];

  if (!Feature) {
    notFound();
  }

  return (
    <div>
      <IoTModuleLayout currentFeatureId={featureId}>
        <Feature />
      </IoTModuleLayout>
      <Footer />
    </div>
  );
}
