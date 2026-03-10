


export function getProjectImages(imgName: string) : string {
    const projectImagesSrc = "/img/projects/";
    return projectImagesSrc + imgName;
}


export function getImage(imgName: string) : string {
    return "/img/"+imgName;
}


export function getRoomElementImage(room: string, imgName: string ) : string {
    return "/img/objects/"+room+"/"+imgName;
}