import React from "react";
import ShowImage from "../ShowImage/ShowImage";

function FilteredImages(props) {
	if (props.imagesData === null) {
		return <p> No Data found that matches parameters! </p>;
	}

	return (
		<>
			{props.imagesData.map(value => {
				return (
					<ShowImage
						key={value.id}
						title={value.title}
						url={value.imageUrl}
						tags={value.tags}
						date={value.dateAdded}
					/>
				);
			})}
		</>
	);
}

export default FilteredImages;
