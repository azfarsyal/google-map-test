// This functional component represents a skeleton loader for a map

const MapSkeleton = () => {
  return (
    <div
      className={`w-full max-w-[436px] overflow-hidden rounded-[32px] border border-solid border-[#E0E0E1] bg-gray-200 xl:h-[750px] xs:hidden xlg:h-[90svh] xlg:w-[376px] xllg:h-[750px] xllg:max-w-[400px] xmlg:h-[750px] xmlg:max-w-[370px] xslg:h-[750px] xslg:max-w-[350px]`}
    />
  );
};

export default MapSkeleton;
