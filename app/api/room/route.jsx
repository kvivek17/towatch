import cloudinary from '@/lib/cloudinary';
import clientPromise from '@/lib/mongo';
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import { Readable } from 'stream';






function buffertostream(buffer) {
    const readable = new Readable()
    readable.push(buffer);
    readable.push(null);
    return readable;
}



export async function POST(request) {

  const { roomname, videoUrl } = await request.json();

  if (!roomname || !videoUrl) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  const user = await currentUser();

  const client = await clientPromise;
  const db = client.db("Towatch");
  const collection = db.collection("rooms");

  const roomid = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  await collection.insertOne({
    roomid,
    user: user.id,
    roomname,
    videoUrl,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true, roomid });
}


export async function GET(request) {
    const searchparams = new URL(request.url).searchParams;
    const roomid = searchparams.get('roomid');
    const user = await currentUser();


    console.log("Fetching room details for mongo room ID:", roomid);
    if (roomid == 'all') {
        const client = await clientPromise;
        const db = client.db('Towatch');
        const collection = db.collection('rooms');
        const result = await collection.find({  user: user.id}).sort({ createdAt: -1 })
      .toArray();
      return NextResponse.json(result)

    }

    const client = await clientPromise;
    const db = client.db('Towatch');
    const collection = db.collection('rooms');
    const room = await collection.findOne({ roomid: roomid });

    console.log("MongoDB room fetched:", room);
    console.log("MongoDB videoUrl:", room?.videoUrl);

    if (!room) {
        return NextResponse.json({ success: false, message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);

}

export async function DELETE(request) {
  const searchParams = new URL(request.url).searchParams;
  const roomid = searchParams.get("roomid");

  if (!roomid) {
    return NextResponse.json({ success: false, message: "Room ID missing" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('Towatch');
  const collection = db.collection('rooms');

  const deleted = await collection.deleteOne({ roomid });

  if (deleted.deletedCount === 0) {
    return NextResponse.json({ success: false, message: "Room not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Room deleted" });
} 
 
